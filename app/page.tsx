import React from 'react';
import { Hero } from '@/components/hero/Hero';
import { ServicesSection } from '@/components/services/ServicesSection';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { FindUsSection } from '@/components/find-us/FindUsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <FindUsSection />
    </>
  );
}
