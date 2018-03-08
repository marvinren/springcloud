

# TODO



* [ ] 实践registry的高可用
* [ ] API公共类
* [ ] 为服务docker化
* [ ] String Stream 支持
* [ ] AuthServer
* [ ] mybatis支持
* [ ] gatling
* [ ] ELK-logstash
* [ ] 打包方式
* [ ] bootRun/bootRepackage
* [ ] liuquibase支持
* [ ] 数据库连接池的使用
* [ ] Swagger配置化


# Done
* [ ] eureka-server和config,zuul的合并生成registery
* [ ] 增加lombok支持
* [ ] 增加mapstruct支持
* [ ] gradle 支持不同的profile`-Dprod`
* [ ] 提供registry的dev,test,prod配置
* [ ] spring-jpa
* [ ] registry 的zuul的容错性配置（超时设置）
* [ ] zuul的容错和回退
* [ ] swagger
* [ ] feign的retry
* [ ] feign的hystrix

# registry



# idea
* import
* Enable annotation processing


# notes
* @ActiveProfiles/@Profile
* swagger codegen暂时不用

## eureka配置
server
```
eureka:
  server:
    enable-self-preservation: false           # 关闭自我保护模式（缺省为打开）
    eviction-interval-timer-in-ms: 5000       # 续期时间，即扫描失效服务的间隔时间（缺省为60*1000ms）
```
client
```
eureka:
  instance:
    lease-renewal-interval-in-seconds: 5      # 心跳时间，即服务续约间隔时间（缺省为30s）
    lease-expiration-duration-in-seconds: 10  # 发呆时间，即服务续约到期时间（缺省为90s）
  client:
    healthcheck:
      enabled: true                           # 开启健康检查（依赖spring-boot-starter-actuator）
```
zuul
```
eureka:
  client:
    registry-fetch-interval-seconds: 5 # 默认为30秒
```

