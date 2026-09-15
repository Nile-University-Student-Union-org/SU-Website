# Graph Report - SU-Website  (2026-09-16)

## Corpus Check
- 206 files · ~356,638 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .example 1, .toml 1)

## Summary
- 3626 nodes · 5404 edges · 167 communities (110 shown, 57 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dab29bc2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prismaNamespace.ts
- User.ts
- BoardMember.ts
- cn
- routeTree.gen.ts
- Committee.ts
- EventStatus.ts
- Event.ts
- Account.ts
- Session.ts
- sidebar.tsx
- admin.events.tsx
- Sponsor.ts
- Result
- SocialLink.ts
- Stat.ts
- AboutCTA.ts
- AboutHero.ts
- ContactInfo.ts
- ContactSubmission.ts
- Footer.ts
- OfficeHours.ts
- Verification.ts
- WhoWeAre.ts
- react
- calendar/index.tsx
- dependencies
- menubar.tsx
- routes/index.tsx
- REST API Best Practices
- Cloud Cost Optimization
- combobox.tsx
- GraphQL Schema Design Patterns
- package.json
- navigation-menu.tsx
- commonInputTypes.ts
- prismaNamespaceBrowser.ts
- Node.js Backend Patterns
- resizable.tsx
- CancellationToken
- What You Must Do When Invoked
- Getting started
- rest-api-template.py
- PrismaClient
- React Modernization
- compilerOptions
- C4 Architecture Documentation Workflow
- BaseSpecification
- Product
- Entity Framework Core Best Practices
- Pre-Implementation Review
- Dapper Patterns and Best Practices
- Microservices Patterns
- components.json
- class-variance-authority
- repository-template.cs
- Apache Spark Optimization
- .NET Backend Development Patterns Implementation Playbook
- browser.ts
- API Design Principles Implementation Playbook
- client.ts
- devDependencies
- AboutCTADelegate
- AboutHeroDelegate
- AccountDelegate
- BoardMemberDelegate
- CommitteeDelegate
- ContactInfoDelegate
- ContactSubmissionDelegate
- EventDelegate
- EventStatusDelegate
- FooterDelegate
- OfficeHoursDelegate
- SessionDelegate
- SocialLinkDelegate
- SponsorDelegate
- StatDelegate
- UserDelegate
- VerificationDelegate
- WhoWeAreDelegate
- s3.ts
- item.tsx
- admin/events.ts
- Instructions
- UnitOfWork
- requireAdmin
- context-menu.tsx
- carousel.tsx
- Instructions
- chart.tsx
- field.tsx
- 📦 Antigravity Skills Manager (`rmyndharis/antigravity-skills`)
- auth.ts
- Redis Caching & Distributed Architecture Patterns
- scripts
- drawer.tsx
- Navbar.tsx
- ListInput
- admin/board.ts
- server-auth.ts
- sponsors.ts
- stats.ts
- graphify reference: extra exports and benchmark
- Ponytail
- class.ts
- manifest.json
- SubmissionsPage
- Ponytail Help
- RichTextEditor.tsx
- empty.tsx
- .SearchAsync
- __root.tsx
- vite.config.ts
- utils.ts
- PrismaClientBaseOptions
- API Design Principles
- .NET Backend Development Patterns
- graphify reference: query, path, explain
- Microservices Patterns
- Node.js Backend Patterns
- React Modernization
- Prisma__UserClient
- data/board.ts
- ponytail-audit/SKILL.md
- Ponytail Gain
- ponytail-review/SKILL.md
- Prisma__AccountClient
- Prisma__BoardMemberClient
- Prisma__CommitteeClient
- Prisma__EventClient
- Prisma__EventStatusClient
- Prisma__SessionClient
- deleteCommitteeFn
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- ponytail-debt/SKILL.md
- Prisma__AboutCTAClient
- Prisma__AboutHeroClient
- Prisma__ContactInfoClient
- Prisma__ContactSubmissionClient
- Prisma__FooterClient
- Prisma__OfficeHoursClient
- Prisma__SocialLinkClient
- Prisma__SponsorClient
- Prisma__StatClient
- Prisma__VerificationClient
- Prisma__WhoWeAreClient
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- @tanstack/eslint-config
- DateTimeInput
- rules/graphify.md
- ponytail.md
- api-designer/SKILL.md
- documentation-engineer/SKILL.md
- extraction-spec.md
- microservices-architect/SKILL.md
- typescript-pro/SKILL.md
- ui-designer/SKILL.md
- ui-ux-designer/SKILL.md
- update-docs/SKILL.md
- workflows/graphify.md
- CreateMemberDialog

## God Nodes (most connected - your core abstractions)
1. `cn()` - 314 edges
2. `react` - 57 edges
3. `requireAdmin()` - 49 edges
4. `@hugeicons/core-free-icons` - 42 edges
5. `@hugeicons/react` - 42 edges
6. `Product` - 37 edges
7. `Button()` - 37 edges
8. `@tanstack/react-router` - 32 edges
9. `PrismaClient` - 28 edges
10. `FileRoutesByPath` - 26 edges

## Surprising Connections (you probably didn't know these)
- `NavLink()` --calls--> `cn()`  [EXTRACTED]
  src/client/components/Navbar.tsx → src/shared/utils.ts
- `Combobox()` --calls--> `cn()`  [EXTRACTED]
  src/client/components/kibo-ui/calendar/index.tsx → src/shared/utils.ts
- `CalendarItem` --calls--> `cn()`  [EXTRACTED]
  src/client/components/kibo-ui/calendar/index.tsx → src/shared/utils.ts
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  src/client/components/ui/alert.tsx → src/shared/utils.ts
- `AlertDescription()` --calls--> `cn()`  [EXTRACTED]
  src/client/components/ui/alert.tsx → src/shared/utils.ts

## Import Cycles
- None detected.

## Communities (167 total, 57 thin omitted)

### Community 0 - "prismaNamespace.ts"
Cohesion: 0.02
Nodes (127): AboutCTAScalarFieldEnum, AboutHeroScalarFieldEnum, AccountScalarFieldEnum, AnyNull, Args, At, AtLeast, AtLoose (+119 more)

### Community 1 - "User.ts"
Cohesion: 0.02
Nodes (87): AggregateUser, BoolFieldUpdateOperationsInput, DateTimeFieldUpdateOperationsInput, GetUserAggregateType, GetUserGroupByPayload, NullableBoolFieldUpdateOperationsInput, NullableDateTimeFieldUpdateOperationsInput, NullableStringFieldUpdateOperationsInput (+79 more)

### Community 2 - "BoardMember.ts"
Cohesion: 0.02
Nodes (86): AggregateBoardMember, BoardMemberAggregateArgs, BoardMemberAvgAggregateInputType, BoardMemberAvgAggregateOutputType, BoardMemberAvgOrderByAggregateInput, BoardMemberCountAggregateInputType, BoardMemberCountAggregateOutputType, BoardMemberCountArgs (+78 more)

### Community 3 - "cn"
Cohesion: 0.04
Nodes (67): input-otp, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), AlertDialogMedia(), AlertDialogOverlay(), AspectRatio() (+59 more)

### Community 4 - "routeTree.gen.ts"
Cohesion: 0.04
Nodes (68): getRouter(), Register, @tanstack/react-router, Route, Route, Route, Route, Route (+60 more)

### Community 5 - "Committee.ts"
Cohesion: 0.03
Nodes (76): AggregateCommittee, Committee$membersArgs, CommitteeAggregateArgs, CommitteeAvgAggregateInputType, CommitteeAvgAggregateOutputType, CommitteeAvgOrderByAggregateInput, CommitteeCountAggregateInputType, CommitteeCountAggregateOutputType (+68 more)

### Community 6 - "EventStatus.ts"
Cohesion: 0.03
Nodes (76): AggregateEventStatus, EventStatus$eventsArgs, EventStatusAggregateArgs, EventStatusAvgAggregateInputType, EventStatusAvgAggregateOutputType, EventStatusAvgOrderByAggregateInput, EventStatusCountAggregateInputType, EventStatusCountAggregateOutputType (+68 more)

### Community 7 - "Event.ts"
Cohesion: 0.03
Nodes (75): AggregateEvent, EventAggregateArgs, EventCountAggregateInputType, EventCountAggregateOutputType, EventCountArgs, EventCountOrderByAggregateInput, EventCreateArgs, EventCreateInput (+67 more)

### Community 8 - "Account.ts"
Cohesion: 0.03
Nodes (73): AccountAggregateArgs, AccountCountAggregateInputType, AccountCountAggregateOutputType, AccountCountArgs, AccountCountOrderByAggregateInput, AccountCreateArgs, AccountCreateInput, AccountCreateManyAndReturnArgs (+65 more)

### Community 9 - "Session.ts"
Cohesion: 0.03
Nodes (73): AggregateSession, GetSessionAggregateType, GetSessionGroupByPayload, SessionAggregateArgs, SessionCountAggregateInputType, SessionCountAggregateOutputType, SessionCountArgs, SessionCountOrderByAggregateInput (+65 more)

### Community 10 - "sidebar.tsx"
Cohesion: 0.07
Nodes (39): Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction(), SidebarGroupContent() (+31 more)

### Community 11 - "admin.events.tsx"
Cohesion: 0.16
Nodes (40): date-fns, ImageUploader(), RichTextEditor(), AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription() (+32 more)

### Community 12 - "Sponsor.ts"
Cohesion: 0.03
Nodes (59): AggregateSponsor, GetSponsorAggregateType, GetSponsorGroupByPayload, IntFieldUpdateOperationsInput, SponsorAggregateArgs, SponsorAvgAggregateInputType, SponsorAvgAggregateOutputType, SponsorAvgOrderByAggregateInput (+51 more)

### Community 13 - "Result"
Cohesion: 0.07
Nodes (44): AbstractValidator, CancellationToken, DateTime, Func, ILogger, IReadOnlyList, Task, CreateProductRequest (+36 more)

### Community 14 - "SocialLink.ts"
Cohesion: 0.03
Nodes (58): AggregateSocialLink, GetSocialLinkAggregateType, GetSocialLinkGroupByPayload, SocialLinkAggregateArgs, SocialLinkAvgAggregateInputType, SocialLinkAvgAggregateOutputType, SocialLinkAvgOrderByAggregateInput, SocialLinkCountAggregateInputType (+50 more)

### Community 15 - "Stat.ts"
Cohesion: 0.03
Nodes (58): AggregateStat, GetStatAggregateType, GetStatGroupByPayload, StatAggregateArgs, StatAvgAggregateInputType, StatAvgAggregateOutputType, StatAvgOrderByAggregateInput, StatCountAggregateInputType (+50 more)

### Community 16 - "AboutCTA.ts"
Cohesion: 0.04
Nodes (52): AboutCTAAggregateArgs, AboutCTACountAggregateInputType, AboutCTACountAggregateOutputType, AboutCTACountArgs, AboutCTACountOrderByAggregateInput, AboutCTACreateArgs, AboutCTACreateInput, AboutCTACreateManyAndReturnArgs (+44 more)

### Community 17 - "AboutHero.ts"
Cohesion: 0.04
Nodes (52): AboutHeroAggregateArgs, AboutHeroCountAggregateInputType, AboutHeroCountAggregateOutputType, AboutHeroCountArgs, AboutHeroCountOrderByAggregateInput, AboutHeroCreateArgs, AboutHeroCreateInput, AboutHeroCreateManyAndReturnArgs (+44 more)

### Community 18 - "ContactInfo.ts"
Cohesion: 0.04
Nodes (52): AggregateContactInfo, ContactInfoAggregateArgs, ContactInfoCountAggregateInputType, ContactInfoCountAggregateOutputType, ContactInfoCountArgs, ContactInfoCountOrderByAggregateInput, ContactInfoCreateArgs, ContactInfoCreateInput (+44 more)

### Community 19 - "ContactSubmission.ts"
Cohesion: 0.04
Nodes (52): AggregateContactSubmission, ContactSubmissionAggregateArgs, ContactSubmissionCountAggregateInputType, ContactSubmissionCountAggregateOutputType, ContactSubmissionCountArgs, ContactSubmissionCountOrderByAggregateInput, ContactSubmissionCreateArgs, ContactSubmissionCreateInput (+44 more)

### Community 20 - "Footer.ts"
Cohesion: 0.04
Nodes (52): AggregateFooter, FooterAggregateArgs, FooterCountAggregateInputType, FooterCountAggregateOutputType, FooterCountArgs, FooterCountOrderByAggregateInput, FooterCreateArgs, FooterCreateInput (+44 more)

### Community 21 - "OfficeHours.ts"
Cohesion: 0.04
Nodes (52): AggregateOfficeHours, GetOfficeHoursAggregateType, GetOfficeHoursGroupByPayload, OfficeHoursAggregateArgs, OfficeHoursCountAggregateInputType, OfficeHoursCountAggregateOutputType, OfficeHoursCountArgs, OfficeHoursCountOrderByAggregateInput (+44 more)

### Community 22 - "Verification.ts"
Cohesion: 0.04
Nodes (52): AggregateVerification, GetVerificationAggregateType, GetVerificationGroupByPayload, VerificationAggregateArgs, VerificationCountAggregateInputType, VerificationCountAggregateOutputType, VerificationCountArgs, VerificationCountOrderByAggregateInput (+44 more)

### Community 23 - "WhoWeAre.ts"
Cohesion: 0.04
Nodes (52): AggregateWhoWeAre, GetWhoWeAreAggregateType, GetWhoWeAreGroupByPayload, WhoWeAreAggregateArgs, WhoWeAreCountAggregateInputType, WhoWeAreCountAggregateOutputType, WhoWeAreCountArgs, WhoWeAreCountOrderByAggregateInput (+44 more)

### Community 24 - "react"
Cohesion: 0.08
Nodes (47): react, sonner, @tanstack/react-router, authClient, AdminFieldRow(), AdminShell(), Button(), Input() (+39 more)

### Community 25 - "calendar/index.tsx"
Cohesion: 0.05
Nodes (52): jotai, CalendarBody(), CalendarBodyProps, CalendarContext, CalendarContextProps, CalendarDatePagination(), CalendarDatePaginationProps, CalendarDatePicker() (+44 more)

### Community 26 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @base-ui/react, better-auth, class-variance-authority, clsx, cmdk (+38 more)

### Community 27 - "menubar.tsx"
Cohesion: 0.09
Nodes (26): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+18 more)

### Community 28 - "routes/index.tsx"
Cohesion: 0.10
Nodes (26): Navbar(), ContactInfoData, FooterData, getIcon(), ICON_MAP, navLinks, SiteFooter(), SocialLinkData (+18 more)

### Community 29 - "REST API Best Practices"
Cohesion: 0.05
Nodes (38): API Keys, Authentication and Authorization, Batch Endpoints, Bearer Token, Bulk Operations, Cache Headers, Caching, Consistent Structure (+30 more)

### Community 30 - "Cloud Cost Optimization"
Cohesion: 0.05
Nodes (36): 1. Visibility, 2. Right-Sizing, 3. Pricing Models, 4. Architecture Optimization, Architecture Patterns, AWS Cost Optimization, AWS Tagging, Azure Advisor Recommendations (+28 more)

### Community 31 - "combobox.tsx"
Cohesion: 0.07
Nodes (31): cmdk, ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup() (+23 more)

### Community 32 - "GraphQL Schema Design Patterns"
Cohesion: 0.06
Nodes (34): 1. Input/Payload Pattern, 1. Non-Null Types, 2. Interfaces for Polymorphism, 2. Optimistic Response Support, 3. Batch Mutations, 3. Unions for Heterogeneous Results, 4. Input Types, Arguments and Filtering (+26 more)

### Community 33 - "package.json"
Cohesion: 0.06
Nodes (32): name, private, type, @base-ui/react, clsx, dotenv, @fontsource/poppins, @fontsource-variable/geist (+24 more)

### Community 34 - "navigation-menu.tsx"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuPositioner(), NavigationMenuTrigger() (+1 more)

### Community 35 - "commonInputTypes.ts"
Cohesion: 0.06
Nodes (31): BoolFilter, BoolNullableFilter, BoolNullableWithAggregatesFilter, BoolWithAggregatesFilter, DateTimeFilter, DateTimeNullableFilter, DateTimeNullableWithAggregatesFilter, DateTimeWithAggregatesFilter (+23 more)

### Community 36 - "prismaNamespaceBrowser.ts"
Cohesion: 0.07
Nodes (28): AboutCTAScalarFieldEnum, AboutHeroScalarFieldEnum, AccountScalarFieldEnum, AnyNull, BoardMemberScalarFieldEnum, CommitteeScalarFieldEnum, ContactInfoScalarFieldEnum, ContactSubmissionScalarFieldEnum (+20 more)

### Community 37 - "Node.js Backend Patterns"
Cohesion: 0.07
Nodes (28): API Response Format, Architectural Patterns, Authentication & Authorization, Authentication Middleware, Best Practices, Caching Strategies, Core Frameworks, Custom Error Classes (+20 more)

### Community 38 - "resizable.tsx"
Cohesion: 0.40
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

### Community 39 - "CancellationToken"
Cohesion: 0.18
Nodes (8): CancellationToken, ILogger, Task, DapperProductRepository, EfCoreProductRepository, IProductRepository, IDbConnection, IEnumerable

### Community 40 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 41 - "Getting started"
Cohesion: 0.07
Nodes (27): 1. Install, 2. Configure environment, 3. Start Postgres and MinIO (Docker), 4. Generate the Prisma client, 5. Run migrations, 6. Seed the database, 7. Run locally, Adding a new admin (+19 more)

### Community 42 - "rest-api-template.py"
Cohesion: 0.13
Nodes (26): create_user(), delete_user(), ErrorDetail, ErrorResponse, get_user(), http_exception_handler(), list_users(), PaginatedResponse (+18 more)

### Community 44 - "React Modernization"
Cohesion: 0.08
Nodes (25): Automatic Batching, Best Practices, Class to Hooks Migration, Code Splitting, Codemods for Automation, Common Pitfalls, Context and HOCs to Hooks, Custom Codemod Example (+17 more)

### Community 45 - "compilerOptions"
Cohesion: 0.08
Nodes (24): compilerOptions, allowImportingTsExtensions, allowJs, baseUrl, esModuleInterop, jsx, lib, module (+16 more)

### Community 46 - "C4 Architecture Documentation Workflow"
Cohesion: 0.08
Nodes (23): 1.1 Discover All Subdirectories, 1.2 Process Each Directory (Bottom-Up), 2.1 Analyze All Code-Level Documentation, 2.2 Create Component Documentation, 2.3 Create Master Component Index, 3.1 Analyze Components and Deployment Definitions, 3.2 Map Components to Containers, 4.1 Analyze System Documentation (+15 more)

### Community 47 - "BaseSpecification"
Cohesion: 0.12
Nodes (19): Func, BaseSpecification, Criteria, Includes, IncludeStrings, OrderBy, OrderByDescending, Skip (+11 more)

### Community 48 - "Product"
Cohesion: 0.09
Nodes (22): AppDbContext, Categories, OrderItems, Orders, Products, Product, Category, CategoryId (+14 more)

### Community 49 - "Entity Framework Core Best Practices"
Cohesion: 0.08
Nodes (23): 10. Handle Concurrency with Row Versioning, 11. Use Explicit Transactions When Needed, 12. Create Indexes for Query Patterns, 1. Use AsNoTracking for Read-Only Queries, 2. Select Only Needed Columns, 3. Avoid N+1 Queries with Eager Loading, 4. Use Split Queries for Large Includes, 5. Use Compiled Queries for Hot Paths (+15 more)

### Community 50 - "Pre-Implementation Review"
Cohesion: 0.09
Nodes (22): API Design Checklist, Authentication & Authorization, Documentation, Documentation, Error Handling, Filtering & Sorting, GraphQL-Specific Checks, HTTP Methods (+14 more)

### Community 51 - "Dapper Patterns and Best Practices"
Cohesion: 0.09
Nodes (22): 10. Custom Type Handlers, 11. Use CommandDefinition for Cancellation, 12. Buffered vs Unbuffered Queries, 13. Connection Pooling Settings, 1. Proper Connection Handling, 2. Connection Lifecycle, 3. Basic CRUD Operations, 4. Dynamic Query Building (+14 more)

### Community 52 - "Microservices Patterns"
Cohesion: 0.09
Nodes (22): 1. Service Decomposition Strategies, 2. Communication Patterns, 3. Data Management, 4. Resilience Patterns, Best Practices, Circuit Breaker Pattern, Common Pitfalls, Communication Patterns (+14 more)

### Community 53 - "components.json"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 54 - "class-variance-authority"
Cohesion: 0.13
Nodes (16): class-variance-authority, Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants, Tabs(), TabsContent() (+8 more)

### Community 55 - "repository-template.cs"
Cohesion: 0.10
Nodes (21): DateTime, Category, Id, Name, Products, Order, CreatedAt, CustomerOrderCode (+13 more)

### Community 56 - "Apache Spark Optimization"
Cohesion: 0.09
Nodes (21): 1. Spark Execution Model, 2. Key Performance Factors, Apache Spark Optimization, Best Practices, Configuration Cheat Sheet, Core Concepts, Do not use this skill when, Do's (+13 more)

### Community 57 - ".NET Backend Development Patterns Implementation Playbook"
Cohesion: 0.10
Nodes (20): 1. Project Structure (Clean Architecture), 2. Dependency Injection Patterns, 3. Async/Await Patterns, 4. Configuration with IOptions, 5. Result Pattern (Avoiding Exceptions for Flow Control), Best Practices, Caching Patterns, Common Pitfalls (+12 more)

### Community 58 - "browser.ts"
Cohesion: 0.10
Nodes (19): AboutCTA, AboutHero, Account, BoardMember, Committee, ContactInfo, ContactSubmission, $Enums (+11 more)

### Community 59 - "API Design Principles Implementation Playbook"
Cohesion: 0.10
Nodes (19): 1. RESTful Design Principles, 2. GraphQL Design Principles, 3. API Versioning Strategies, API Design Principles Implementation Playbook, Best Practices, Common Pitfalls, Core Concepts, GraphQL APIs (+11 more)

### Community 60 - "client.ts"
Cohesion: 0.08
Nodes (27): AboutCTA, AboutHero, Account, BoardMember, Committee, ContactInfo, ContactSubmission, $Enums (+19 more)

### Community 61 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, dotenv, jsdom, prettier, prettier-plugin-tailwindcss, prisma, @tanstack/devtools-vite, @tanstack/eslint-config (+11 more)

### Community 80 - "s3.ts"
Cohesion: 0.20
Nodes (14): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, handleFile(), ALLOWED_IMAGE_TYPES, assertValidImageUpload(), buildImageKey(), createPresignedUploadUrl(), getS3Client() (+6 more)

### Community 81 - "item.tsx"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 82 - "admin/events.ts"
Cohesion: 0.14
Nodes (17): EventStatusesPage(), handleDelete(), StatusDialog(), onSubmit(), EventDialog(), onSubmit(), EventsAdminPage(), handleDelete() (+9 more)

### Community 83 - "Instructions"
Cohesion: 0.12
Nodes (15): 1. Technical Debt Inventory, 2. Impact Assessment, 3. Debt Metrics Dashboard, 4. Prioritized Remediation Plan, 5. Implementation Strategy, 6. Prevention Strategy, 7. Communication Plan, 8. Success Metrics (+7 more)

### Community 84 - "UnitOfWork"
Cohesion: 0.16
Nodes (9): IUnitOfWork, Orders, Products, UnitOfWork, Orders, Products, IDbContextTransaction, IDisposable (+1 more)

### Community 85 - "requireAdmin"
Cohesion: 0.26
Nodes (13): CommitteeDialog(), onSubmit(), SocialLinkDialog(), onSubmit(), SocialLinksPage(), handleDelete(), requireAdmin(), createCommitteeFn (+5 more)

### Community 86 - "context-menu.tsx"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubTrigger() (+1 more)

### Community 87 - "carousel.tsx"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+6 more)

### Community 88 - "Instructions"
Cohesion: 0.14
Nodes (13): 1. Analyze Component Requirements, 2. Generate React Component, 3. Generate React Native Component, 4. Generate Component Tests, 5. Generate Styles, 6. Generate Storybook Stories, Context, Do not use this skill when (+5 more)

### Community 89 - "chart.tsx"
Cohesion: 0.19
Nodes (12): recharts, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+4 more)

### Community 90 - "field.tsx"
Cohesion: 0.13
Nodes (16): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Field(), FieldContent(), FieldDescription(), FieldError() (+8 more)

### Community 91 - "📦 Antigravity Skills Manager (`rmyndharis/antigravity-skills`)"
Cohesion: 0.15
Nodes (12): 1. List Catalog Skills, 2. Search Catalog Skills, 3. Install Skill, 4. List Installed Skills, 📦 Antigravity Skills Manager (`rmyndharis/antigravity-skills`), Available Commands & Usage, Do not use this skill when, Instructions (+4 more)

### Community 92 - "auth.ts"
Cohesion: 0.15
Nodes (15): better-auth, @tanstack/react-start, Route, ContactPage(), auth, AuthSession, prisma, submitContactFn (+7 more)

### Community 93 - "Redis Caching & Distributed Architecture Patterns"
Cohesion: 0.17
Nodes (11): 1. Core Caching Patterns, 2. Cache Stampede (Dog-Piling) Mitigation, 3. TTL and Invalidation Strategies, 4. Dual Backend Implementation Examples, Cache-Aside (Lazy Loading) — Default Pattern, .NET (StackExchange.Redis), Node.js (ioredis / node-redis), Redis Caching & Distributed Architecture Patterns (+3 more)

### Community 94 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, dev, format, generate, lint, migrate, preview (+4 more)

### Community 95 - "drawer.tsx"
Cohesion: 0.17
Nodes (7): vaul, DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 96 - "Navbar.tsx"
Cohesion: 0.20
Nodes (10): NavLink(), navLinks, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay() (+2 more)

### Community 99 - "admin/board.ts"
Cohesion: 0.21
Nodes (11): zod, BoardPage(), handleDelete(), MemberDialog(), onSubmit(), loginSearchSchema, Route, createBoardMemberFn (+3 more)

### Community 100 - "server-auth.ts"
Cohesion: 0.33
Nodes (7): UsersPage(), handleRoleChange(), getServerSession(), requireSession(), requireSuperAdmin(), listAdminUsersFn, updateUserRoleFn

### Community 101 - "sponsors.ts"
Cohesion: 0.33
Nodes (8): SponsorDialog(), onSubmit(), SponsorsPage(), handleDelete(), createSponsorFn, deleteSponsorFn, updateSponsorFn, sponsorSchema

### Community 102 - "stats.ts"
Cohesion: 0.33
Nodes (8): StatDialog(), onSubmit(), StatsPage(), handleDelete(), createStatFn, deleteStatFn, updateStatFn, statSchema

### Community 103 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 104 - "Ponytail"
Cohesion: 0.22
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 105 - "class.ts"
Cohesion: 0.22
Nodes (3): config, LogOptions, PrismaClientConstructor

### Community 106 - "manifest.json"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

### Community 107 - "SubmissionsPage"
Cohesion: 0.53
Nodes (6): SubmissionsPage(), handleDelete(), handleView(), toggleRead(), deleteSubmissionFn, markSubmissionReadFn

### Community 108 - "Ponytail Help"
Cohesion: 0.25
Nodes (7): Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 109 - "RichTextEditor.tsx"
Cohesion: 0.25
Nodes (5): lucide-react, @tiptap/extension-placeholder, @tiptap/react, @tiptap/starter-kit, RichTextEditorProps

### Community 110 - "empty.tsx"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 111 - ".SearchAsync"
Cohesion: 0.57
Nodes (4): IReadOnlyList, ProductSearchRequest, Items, TotalCount

### Community 112 - "__root.tsx"
Cohesion: 0.33
Nodes (4): next-themes, @tanstack/react-devtools, @tanstack/react-router-devtools, Toaster()

### Community 113 - "vite.config.ts"
Cohesion: 0.29
Nodes (6): @tailwindcss/vite, @tanstack/devtools-vite, vite, vite-tsconfig-paths, @vitejs/plugin-react, config

### Community 114 - "utils.ts"
Cohesion: 0.09
Nodes (21): @hugeicons/core-free-icons, @hugeicons/react, Props, CTASection(), HeroSection(), CommitteeData, MissionSection(), StatData (+13 more)

### Community 115 - "PrismaClientBaseOptions"
Cohesion: 0.67
Nodes (3): PrismaClientBaseOptions, PrismaClientOptionsWithAccelerateUrl, PrismaClientOptionsWithAdapter

### Community 116 - "API Design Principles"
Cohesion: 0.33
Nodes (5): API Design Principles, Do not use this skill when, Instructions, Resources, Use this skill when

### Community 117 - ".NET Backend Development Patterns"
Cohesion: 0.33
Nodes (5): Do not use this skill when, Instructions, .NET Backend Development Patterns, Resources, Use this skill when

### Community 118 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 119 - "Microservices Patterns"
Cohesion: 0.33
Nodes (5): Do not use this skill when, Instructions, Microservices Patterns, Resources, Use this skill when

### Community 120 - "Node.js Backend Patterns"
Cohesion: 0.33
Nodes (5): Do not use this skill when, Instructions, Node.js Backend Patterns, Resources, Use this skill when

### Community 121 - "React Modernization"
Cohesion: 0.33
Nodes (5): Do not use this skill when, Instructions, React Modernization, Resources, Use this skill when

### Community 123 - "data/board.ts"
Cohesion: 0.33
Nodes (4): board, BoardMember, Committee, committees

### Community 124 - "ponytail-audit/SKILL.md"
Cohesion: 0.40
Nodes (4): Boundaries, Hunt, Output, Tags

### Community 125 - "Ponytail Gain"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 126 - "ponytail-review/SKILL.md"
Cohesion: 0.40
Nodes (4): Boundaries, Examples, Format, Scoring

### Community 133 - "deleteCommitteeFn"
Cohesion: 1.00
Nodes (3): CommitteesPage(), handleDelete(), deleteCommitteeFn

### Community 134 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 135 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 136 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 137 - "ponytail-debt/SKILL.md"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

## Knowledge Gaps
- **2125 isolated node(s):** `YourNamespace.Infrastructure.Data`, `Products`, `Categories`, `Orders`, `OrderItems` (+2120 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 2655 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@prisma/adapter-pg` connect `client.ts` to `package.json`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `prisma` connect `auth.ts` to `admin/board.ts`, `server-auth.ts`, `sponsors.ts`, `stats.ts`, `routes/index.tsx`, `admin/events.ts`, `requireAdmin`, `react`, `client.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `Navbar.tsx`, `package.json`, `chart.tsx`, `cn`, `sidebar.tsx`, `admin.events.tsx`, `item.tsx`, `utils.ts`, `class-variance-authority`, `carousel.tsx`, `context-menu.tsx`, `calendar/index.tsx`, `field.tsx`, `menubar.tsx`, `routes/index.tsx`, `drawer.tsx`, `combobox.tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `YourNamespace.Infrastructure.Data`, `Products`, `Categories` to the rest of the system?**
  _2125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prismaNamespace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.015625 - nodes in this community are weakly interconnected._
- **Should `User.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.022727272727272728 - nodes in this community are weakly interconnected._
- **Should `BoardMember.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.022988505747126436 - nodes in this community are weakly interconnected._