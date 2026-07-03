import { createBrowserRouter } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import AppLayout from '../layout/AppLayout'
import AnimationsPage from '../pages/AnimationsPage'
import ButtonsPage from '../pages/ButtonsPage'
import BuilderPage from '../pages/BuilderPage'
import CardsPage from '../pages/CardsPage'
import ContactPage from '../pages/ContactPage'
import CtaPage from '../pages/CtaPage'
import FaqPage from '../pages/FaqPage'
import FootersPage from '../pages/FootersPage'
import FormsPage from '../pages/FormsPage'
import GalleryPage from '../pages/GalleryPage'
import HeadersPage from '../pages/HeadersPage'
import HeroesPage from '../pages/HeroesPage'
import HomePage from '../pages/HomePage'
import IconsPage from '../pages/IconsPage'
import NavigationPage from '../pages/NavigationPage'
import PricingPage from '../pages/PricingPage'
import ServicesPage from '../pages/ServicesPage'
import TestimonialsPage from '../pages/TestimonialsPage'
import TypographyPage from '../pages/TypographyPage'

const pageByPath = {
  '/': HomePage,
  '/builder': BuilderPage,
  '/headers': HeadersPage,
  '/heroes': HeroesPage,
  '/services': ServicesPage,
  '/gallery': GalleryPage,
  '/pricing': PricingPage,
  '/testimonials': TestimonialsPage,
  '/faq': FaqPage,
  '/cta': CtaPage,
  '/forms': FormsPage,
  '/contact': ContactPage,
  '/footers': FootersPage,
  '/navigation': NavigationPage,
  '/buttons': ButtonsPage,
  '/cards': CardsPage,
  '/typography': TypographyPage,
  '/animations': AnimationsPage,
  '/icons': IconsPage,
} as const

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: navigationItems.map((item) => {
      const Component = pageByPath[item.path as keyof typeof pageByPath]

      return {
        index: item.path === '/',
        path: item.path === '/' ? undefined : item.path.slice(1),
        element: <Component />,
      }
    }),
  },
])
