import React from 'react'
import { MapPin, Mail, Globe, ChevronRight, Calendar, XCircle } from 'lucide-react'

export default function FAQTextLine({ text, bulletClass }) {
  if (typeof text !== 'string') return text;
  
  const emojiMap = [
    { emoji: '👉', icon: 'chevron' },
    { emoji: '📍', icon: 'map' },
    { emoji: '📅', icon: 'calendar' },
    { emoji: '❌', icon: 'x' },
    { emoji: '📩', icon: 'mail' },
    { emoji: '🌐', icon: 'globe' },
  ];
  
  for (const item of emojiMap) {
    if (text.startsWith(item.emoji)) {
      const remainingText = text.substring(item.emoji.length).trim();
      let IconComponent = null;
      let iconColor = 'text-slate-500';
      
      switch (item.icon) {
        case 'chevron':
          IconComponent = ChevronRight;
          iconColor = bulletClass ? bulletClass.replace('bg-', 'text-') : 'text-blue-500';
          break;
        case 'map':
          IconComponent = MapPin;
          iconColor = 'text-rose-500';
          break;
        case 'calendar':
          IconComponent = Calendar;
          iconColor = 'text-amber-500';
          break;
        case 'x':
          IconComponent = XCircle;
          iconColor = 'text-red-500';
          break;
        case 'mail':
          IconComponent = Mail;
          iconColor = 'text-indigo-500';
          break;
        case 'globe':
          IconComponent = Globe;
          iconColor = 'text-cyan-500';
          break;
      }
      
      return (
        <span className="inline-flex items-start gap-2">
          {IconComponent && <IconComponent className={`h-4 w-4 shrink-0 mt-0.5 ${iconColor}`} />}
          <span>{remainingText}</span>
        </span>
      );
    }
  }
  return <span>{text}</span>;
}
