import React from 'react';

export type Platform = 'google' | 'instagram' | 'tiktok' | 'facebook' | 'youtube';

export interface GeneratedContent {
  title: string;
  body: string;
  hashtags: string;
  growth_tips: string[];
}

export interface PlatformConfig {
  id: Platform;
  icon: React.ReactNode;
  formats: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}