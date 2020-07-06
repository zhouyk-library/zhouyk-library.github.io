# 权限拦截
springSecurity的过滤器链如下（存在顺序）

#### SecurityContextPersistenceFilter
- 创建SecurityContext

- 清空SecurityContextHolder

#### LogoutFilter
- 处理注销

#### AbstractAuthenticationProcessingFilter


#### DefaultLoginPageGeneratingFilter


#### BasicAuthenticationFilter


#### SecurityContextHolderAwareRequestFilter


#### RememberMeAuthenticationFilter



#### AnonymousAuthenticationFilter


#### ExceptionTranslationFilter


#### SessionManagementFilter


#### FilterSecurityInterceptor


#### FilterChainProxy


