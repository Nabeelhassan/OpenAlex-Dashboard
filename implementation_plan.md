# OpenAlex Dashboard Implementation Plan

## Overview
This document outlines the implementation plan for the remaining OpenAlex entities in our Next.js dashboard project. The project uses Next.js, Shadcn UI, and ECharts to create search pages and detail pages for each OpenAlex entity.

## Currently Implemented Entities
- ✅ Works
- ✅ Authors 


## Entities To Be Implemented
1. Sources
2. Topics
3. Publishers
4. Funders
5. Geo (Geographical data)
6. Institutions

## Implementation Structure
Each entity implementation should follow the established pattern in the codebase:

```
app/openalex/[entity-name]/
├── components/          # Entity-specific components
├── page.tsx             # Main search page
└── [id]/                # Detail view for a specific entity
    └── page.tsx         # Entity detail page
```

## Implementation Plan

### 1. Sources

#### API Documentation Reference
- Review the Sources API documentation at https://docs.openalex.org/api-entities/sources

#### Implementation Tasks
1. Create directory structure:
   - `app/openalex/sources/`
   - `app/openalex/sources/components/`
   - `app/openalex/sources/[id]/`

2. Implement search page (`page.tsx`):
   - Search functionality with filters specific to sources (e.g., type, publisher)
   - Pagination
   - Result cards with key information
   - Sorting options

3. Implement detail page (`[id]/page.tsx`):
   - Source metadata display
   - Key metrics visualization with ECharts
   - Related works
   - Publisher information
   - Citation metrics

4. Create source-specific components:
   - SourceCard
   - SourceDetail
   - SourceMetrics
   - SourceFilters

### 2. Topics

#### API Documentation Reference
- Review the Topics API documentation at https://docs.openalex.org/api-entities/topics

#### Implementation Tasks
1. Create directory structure:
   - `app/openalex/topics/`
   - `app/openalex/topics/components/`
   - `app/openalex/topics/[id]/`

2. Implement search page (`page.tsx`):
   - Topic search functionality
   - Hierarchical topic visualization
   - Topic clustering/grouping

3. Implement detail page (`[id]/page.tsx`):
   - Topic description and metadata
   - Related topics visualization
   - Top works in the topic
   - Topic evolution over time (trend chart)
   - Key authors in the topic

4. Create topic-specific components:
   - TopicCard
   - TopicTree
   - TopicDetail
   - TopicTrendChart

### 3. Publishers

#### API Documentation Reference
- Review the Publishers API documentation at https://docs.openalex.org/api-entities/publishers

#### Implementation Tasks
1. Create directory structure:
   - `app/openalex/publishers/`
   - `app/openalex/publishers/components/`
   - `app/openalex/publishers/[id]/`

2. Implement search page (`page.tsx`):
   - Publisher search functionality
   - Filters for publisher types
   - Sorting by publication volume, citation metrics

3. Implement detail page (`[id]/page.tsx`):
   - Publisher profile
   - Sources (journals, conferences) published
   - Publishing metrics over time
   - Top cited works
   - Subject area distribution

4. Create publisher-specific components:
   - PublisherCard
   - PublisherMetrics
   - PublisherSourcesList
   - PublisherTopicsChart

### 4. Funders

#### API Documentation Reference
- Review the Funders API documentation at https://docs.openalex.org/api-entities/funders

#### Implementation Tasks
1. Create directory structure:
   - `app/openalex/funders/`
   - `app/openalex/funders/components/`
   - `app/openalex/funders/[id]/`

2. Implement search page (`page.tsx`):
   - Funder search functionality
   - Filters for funder types, regions
   - Sorting by funding volume, impact

3. Implement detail page (`[id]/page.tsx`):
   - Funder profile and description
   - Funded works metrics
   - Research areas funded (topic distribution)
   - Top funded institutions
   - Funding trends over time

4. Create funder-specific components:
   - FunderCard
   - FunderMetrics
   - FundingTrendChart
   - FundedInstitutionsList

### 5. Geo

#### API Documentation Reference
- Review the Geo API documentation at https://docs.openalex.org/api-entities/geo

#### Implementation Tasks
1. Create directory structure:
   - `app/openalex/geo/`
   - `app/openalex/geo/components/`
   - `app/openalex/geo/[id]/`

2. Implement search/explore page (`page.tsx`):
   - Interactive world map
   - Region selection
   - Research output metrics by geography
   - Filtering by research topics, time periods

3. Implement detail page (`[id]/page.tsx`):
   - Region-specific research metrics
   - Top institutions in the region
   - Subject area distribution
   - Collaboration network visualization
   - Research output trends

4. Create geo-specific components:
   - WorldMap
   - RegionMetrics
   - GeoFilters
   - RegionDetail

## Technical Implementation Guidelines

### Data Fetching
- Implement server-side data fetching using Next.js Server Components
- Create reusable API utility functions in `app/lib/data.ts` for each entity
- Implement proper error handling and loading states
- Use pagination for large result sets

### UI Components
- Leverage Shadcn UI components for consistency
- Create entity-specific card components for search results
- Implement responsive designs for all pages
- Create reusable filter components

### Visualization
- Use ECharts for data visualization
- Create entity-specific chart components
- Implement consistent color schemes and styling
- Add interactivity to charts for better user experience

### Performance Optimization
- Implement proper data caching
- Use Next.js Suspense for loading states
- Optimize image loading and processing
- Implement virtualization for long lists

### Testing
- Create unit tests for API utility functions
- Implement component tests for UI elements
- Add end-to-end tests for critical user flows

## Development Timeline

### Week 1: Sources
- Implement Sources search page and detail page
- Create necessary components and API utilities

### Week 2: Topics
- Implement Topics search page and detail page
- Create visualization components for topic relationships

### Week 3: Publishers
- Implement Publishers search page and detail page
- Create publisher metrics visualizations

### Week 4: Funders
- Implement Funders search page and detail page
- Create funding trend visualizations

### Week 5: Geo
- Implement Geo exploration page and detail pages
- Create interactive maps and regional visualizations

### Week 6: Integration & Refinement
- Integrate all entities with the main dashboard
- Refine UI/UX across all pages
- Performance optimization
- Testing and bug fixes

## Conclusion
This implementation plan provides a structured approach to developing the remaining OpenAlex entities for the dashboard. By following this plan, we can ensure consistent implementation across all entities while leveraging the best practices of Next.js development. 