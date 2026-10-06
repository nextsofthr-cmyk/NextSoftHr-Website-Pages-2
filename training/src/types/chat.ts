export type SenderRole = 'learner' | 'advisor' | 'system';

export interface ChatCourseCard {
  id: string;
  title: string;
  category: string;
  priceUSD: number;
  priceNGN: number;
  duration: string;
  format: string;
  level: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: SenderRole;
  channelId: string;
  text: string;
  timestamp: number;
  avatar?: string;
  badge?: string;
  suggestedCourse?: ChatCourseCard;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  advisorName: string;
  advisorRole: string;
  advisorAvatar: string;
  specialty: string;
  statusText: string;
}

export interface TypingStatus {
  userId: string;
  userName: string;
  channelId: string;
  isTyping: boolean;
}
