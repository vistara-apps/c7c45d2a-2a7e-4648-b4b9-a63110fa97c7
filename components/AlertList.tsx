'use client';

import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Edit, TrendingUp, TrendingDown } from 'lucide-react';
import { Alert } from '../lib/types';
import { PrimaryButton } from './ui/PrimaryButton';
import { AlertConfiguration } from './ui/AlertConfiguration';

interface AlertListProps {
  userId?: string;
}

export function AlertList({ userId }: AlertListProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);

  useEffect(() => {
    if (userId) {
      loadAlerts();
    }
  }, [userId]);

  const loadAlerts = async () => {
    try {
      const response = await fetch(`/api/alerts?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (alertData: Partial<Alert>) => {
    if (!userId) return;

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...alertData, userId }),
      });

      if (response.ok) {
        await loadAlerts();
        setShowCreateAlert(false);
      }
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const handleUpdateAlert = async (alertData: Partial<Alert>) => {
    if (!editingAlert) return;

    try {
      const response = await fetch('/api/alerts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingAlert.id, ...alertData }),
      });

      if (response.ok) {
        await loadAlerts();
        setEditingAlert(null);
      }
    } catch (error) {
      console.error('Error updating alert:', error);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts?id=${alertId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadAlerts();
      }
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const getConditionIcon = (conditionType: string) => {
    switch (conditionType) {
      case 'price_above':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'price_below':
        return <TrendingDown className="h-4 w-4 text-danger" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const getConditionText = (conditionType: string, thresholdValue: number) => {
    switch (conditionType) {
      case 'price_above':
        return `Price > $${thresholdValue.toLocaleString()}`;
      case 'price_below':
        return `Price < $${thresholdValue.toLocaleString()}`;
      case 'percent_change':
        return `Change > ${thresholdValue}%`;
      default:
        return `Threshold: ${thresholdValue}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (showCreateAlert) {
    return (
      <AlertConfiguration
        onSave={handleCreateAlert}
        onClose={() => setShowCreateAlert(false)}
      />
    );
  }

  if (editingAlert) {
    return (
      <AlertConfiguration
        variant="price"
        assetSymbol={editingAlert.assetSymbol}
        onSave={handleUpdateAlert}
        onClose={() => setEditingAlert(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Price Alerts</h3>
          <p className="text-sm text-muted-foreground">
            {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <PrimaryButton
          onClick={() => setShowCreateAlert(true)}
          size="sm"
          className="flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Alert</span>
        </PrimaryButton>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="bg-card rounded-lg p-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-card-foreground mb-2">
            No alerts yet
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first price alert to stay updated on market movements.
          </p>
          <PrimaryButton onClick={() => setShowCreateAlert(true)}>
            Create Alert
          </PrimaryButton>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-card rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {alert.assetSymbol.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">
                      {alert.assetSymbol.toUpperCase()}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getConditionIcon(alert.conditionType)}
                      <p className="text-sm text-muted-foreground">
                        {getConditionText(alert.conditionType, alert.thresholdValue)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.isActive
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {alert.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <button
                    onClick={() => setEditingAlert(alert)}
                    className="p-1 hover:bg-secondary rounded transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="p-1 hover:bg-secondary rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {alert.lastTriggered && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Last triggered: {alert.lastTriggered.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

