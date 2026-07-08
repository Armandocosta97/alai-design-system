import { createBrowserRouter } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import AppLayout from '../layout/AppLayout'
import AnimationsPage from '../pages/AnimationsPage'
import AssetsPage from '../pages/AssetsPage'
import ButtonsPage from '../pages/ButtonsPage'
import BuilderPage from '../pages/BuilderPage'
import CardsPage from '../pages/CardsPage'
import ContactPage from '../pages/ContactPage'
import ComponentCreatorPage from '../pages/ComponentCreatorPage'
import CtaPage from '../pages/CtaPage'
import DeveloperToolsPage from '../pages/DeveloperToolsPage'
import FaqPage from '../pages/FaqPage'
import FeaturesPage from '../pages/FeaturesPage'
import FootersPage from '../pages/FootersPage'
import FormsPage from '../pages/FormsPage'
import GalleryPage from '../pages/GalleryPage'
import HeadersPage from '../pages/HeadersPage'
import HeroesPage from '../pages/HeroesPage'
import HomePage from '../pages/HomePage'
import IconsPage from '../pages/IconsPage'
import ImportProjectPage from '../pages/ImportProjectPage'
import LogoCloudPage from '../pages/LogoCloudPage'
import NavigationPage from '../pages/NavigationPage'
import PlaygroundPage from '../pages/PlaygroundPage'
import PreviewPage from '../pages/PreviewPage'
import PricingPage from '../pages/PricingPage'
import ProcessPage from '../pages/ProcessPage'
import ServicesPage from '../pages/ServicesPage'
import StatsPage from '../pages/StatsPage'
import TeamPage from '../pages/TeamPage'
import TemplateDetailPage from '../pages/TemplateDetailPage'
import TemplatePreviewPage from '../pages/TemplatePreviewPage'
import TemplatesPage from '../pages/TemplatesPage'
import TestimonialsPage from '../pages/TestimonialsPage'
import TypographyPage from '../pages/TypographyPage'

const pageByPath = {
  '/': HomePage,
  '/builder': BuilderPage,
  '/assets': AssetsPage,
  '/templates': TemplatesPage,
  '/import': ImportProjectPage,
  '/headers': HeadersPage,
  '/heroes': HeroesPage,
  '/logocloud': LogoCloudPage,
  '/services': ServicesPage,
  '/features': FeaturesPage,
  '/stats': StatsPage,
  '/gallery': GalleryPage,
  '/team': TeamPage,
  '/process': ProcessPage,
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
  '/developer-tools': DeveloperToolsPage,
  '/component-creator': ComponentCreatorPage,
} as const

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...navigationItems.map((item) => {
        const Component = pageByPath[item.path as keyof typeof pageByPath]

        return {
          index: item.path === '/',
          path: item.path === '/' ? undefined : item.path.slice(1),
          element: <Component />,
        }
      }),
      { path: 'playground/:componentId', element: <PlaygroundPage /> },
      { path: 'preview', element: <PreviewPage /> },
      { path: 'templates/:templateId', element: <TemplateDetailPage /> },
      { path: 'templates/:templateId/preview', element: <TemplatePreviewPage /> },
    ],
  },
])
