/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon identifier
  benefits: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial';
  location: string;
  capacity: string; // e.g. "120 kWp"
  beforeImg: string;
  afterImg: string;
  stats: { label: string; value: string }[];
  description: string;
  images: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  url?: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  details: string[];
}

export interface Industry {
  id: string;
  name: string;
  icon: string; // lucide identifier
  savings: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}
