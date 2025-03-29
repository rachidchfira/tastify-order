
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import NotificationService from "@/services/NotificationService";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationProps {
  className?: string;
}

export default function BossNotifications({ className }: NotificationProps) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    // Get initial notifications
    const initialNotifications = NotificationService.getInstance().getNotifications();
    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.isRead).length);
    
    // Subscribe to new notifications
    const unsubscribe = NotificationService.getInstance().subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prevCount => prevCount + 1);
    });
    
    // Request notification permission
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  const handleMarkAsRead = (notificationId: string) => {
    NotificationService.getInstance().markAsRead(notificationId);
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
    setUnreadCount(prevCount => Math.max(0, prevCount - 1));
  };
  
  const formatTimestamp = (date: Date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString();
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="relative p-2">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 bg-brand-red text-white text-xs p-0 min-w-5 h-5 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <h4 className="font-semibold">Boss Notifications</h4>
            <p className="text-xs text-gray-500">Receive updates on new orders</p>
          </div>
          
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b ${notification.isRead ? 'bg-white' : 'bg-gray-50'}`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-sm">{notification.title}</h5>
                    {!notification.isRead && (
                      <Badge variant="outline" className="bg-brand-red/10 text-brand-red border-brand-red/20 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-1">{notification.message}</p>
                  
                  {notification.type === 'order' && (
                    <div className="bg-gray-50 p-2 rounded-md text-xs mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">{notification.data.orderId}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-medium capitalize">{notification.data.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{formatCurrency(notification.data.totalAmount)}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-right mt-2">
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
