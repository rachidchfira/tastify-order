
type NotificationType = 'order' | 'payment' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  timestamp: Date;
  isRead: boolean;
}

// This would be replaced with a real backend notification system in production
class NotificationService {
  private static instance: NotificationService;
  private listeners: Array<(notification: Notification) => void> = [];
  private notificationHistory: Notification[] = [];
  
  private constructor() {}
  
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }
  
  public sendNotification(
    type: NotificationType, 
    title: string, 
    message: string, 
    data?: any
  ): Notification {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      data,
      timestamp: new Date(),
      isRead: false
    };
    
    this.notificationHistory.push(notification);
    
    // In a real app, this would send to a server
    console.log('BOSS NOTIFICATION:', notification);
    
    // For development purposes, we're using browser notifications if available
    this.showBrowserNotification(notification);
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(notification));
    
    return notification;
  }
  
  private showBrowserNotification(notification: Notification): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/favicon.ico'
            });
          }
        });
      }
    }
  }
  
  public sendOrderNotification(
    orderId: string, 
    customerName: string,
    totalAmount: number,
    items: string[],
    paymentMethod: string
  ): Notification {
    const title = `New Order #${orderId}`;
    const message = `${customerName} placed an order for ${items.length} items totaling ${totalAmount}`;
    const data = {
      orderId,
      customerName,
      totalAmount,
      items,
      paymentMethod,
      timestamp: new Date()
    };
    
    return this.sendNotification('order', title, message, data);
  }
  
  public subscribe(callback: (notification: Notification) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
  
  public getNotifications(): Notification[] {
    return [...this.notificationHistory];
  }
  
  public markAsRead(notificationId: string): void {
    this.notificationHistory = this.notificationHistory.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true } 
        : notification
    );
  }
}

export default NotificationService;
