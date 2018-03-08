package com.ai.qmc.registery.test;

import com.ai.qmc.register.RegisterApplication;
import com.ai.qmc.register.domain.UserVO;
import com.alibaba.fastjson.JSON;
import com.google.gson.JsonObject;
import freemarker.ext.beans.HashAdapter;
import org.hamcrest.Matcher;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Matchers.contains;

/**
 * 改测试类是需要authserver已经启动后，进行测试的，所以在集成进行单元测试，可以关闭该测试
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.registery
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 10:51
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 10:51
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@RunWith(SpringRunner.class)
//@SpringBootTest(classes = {RegisterApplication.class})
public class TestOAuth {

    final transient static private Logger log = LoggerFactory.getLogger(TestOAuth.class);
    static private RestTemplate restTemplate = null;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @BeforeClass
    public static void setUp(){
        restTemplate = new RestTemplateBuilder()
                //.basicAuthorization("admin", "admin")
                .setConnectTimeout(3000)
                .setReadTimeout(5000)
                .rootUri("http://127.0.0.1:8761/")
                .build();
    }


    @Test
    public void testTokenFetch(){

        String url = "/oauth/token?grant_type=password&username=admin&password=admin";
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        //client信息
        headers.add("Authorization","Basic Y2xpZW50OnNlY3JldA==");


        Map<String, String> result_map = restTemplate.postForObject(url, new HttpEntity<String>(headers), Map.class);
        Assert.assertNotNull(result_map);
        Assert.assertTrue(result_map.containsKey("access_token"));
        Assert.assertTrue(result_map.containsKey("token_type"));
        Assert.assertTrue(result_map.containsKey("refresh_token"));
        log.info(JSON.toJSONString(result_map));
        log.info(result_map.get("user_name"));
    }

    /**
     * 无token报错401
     */
    @Test
    public void testNoneTokenNoAccess(){
        String url = "/fetch_user";
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        thrown.expect(HttpClientErrorException.class);
        thrown.expectMessage(contains("401"));
        Map restTemplateForObject = restTemplate.getForObject(url, Map.class, HttpMethod.GET, headers);

        log.info(JSON.toJSONString(restTemplateForObject));
        Assert.fail("权限没有报错");

    }

    /**
     * 通过token测试连接是否正常
     */
    @Test
    public void testUseToken(){

        /**获取token**/
        String url = "/oauth/token?grant_type=password&username=admin&password=admin";
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        //client信息
        headers.add("Authorization","Basic Y2xpZW50OnNlY3JldA==");


        Map<String, String> result_map = restTemplate.postForObject(url, new HttpEntity<String>(headers), Map.class);
        String token = result_map.get("access_token");
        log.info("Get Token: {}", token);

        /**使用token范文地址**/
        url = "/fetch_user";
        headers.set("Authorization", "bearer " + token);
        UserVO user = restTemplate.postForObject(url, new HttpEntity<String>(headers), UserVO.class);
        log.info(JSON.toJSONString(user));


    }


    /**
     * 检查token，可以获取token中保存的信息
     */
    @Test
    public void testCheckToken(){

        /**获取token**/
        String url = "/oauth/token?grant_type=password&username=admin&password=admin";
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        //client信息
        headers.add("Authorization","Basic Y2xpZW50OnNlY3JldA==");


        Map<String, String> result_map = restTemplate.postForObject(url, new HttpEntity<String>(headers), Map.class);
        String token = result_map.get("access_token");
        log.info("Get Token: {}", token);

        url = "/oauth/check_token";
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        Map<String, String> params = new HashMap<>();
        result_map = restTemplate.postForObject(url, new HttpEntity<String>("token=" + token, headers), Map.class, params);
        log.info(JSON.toJSONString(result_map));
        Assert.assertNotNull(result_map);
        Assert.assertTrue(result_map.containsKey("client_id"));

    }

    @Test
    public void testRefreshToken(){
        /**获取token**/
        String url = "/oauth/token?grant_type=password&username=admin&password=admin";
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        //client信息
        headers.add("Authorization","Basic Y2xpZW50OnNlY3JldA==");


        Map<String, String> result_map = restTemplate.postForObject(url, new HttpEntity<String>(headers), Map.class);
        String token = result_map.get("refresh_token");

        url = "/oauth/token?grant_type=refresh_token&refresh_token=" + token;
        result_map = restTemplate.postForObject(url, new HttpEntity<String>(headers), Map.class);
        log.info(JSON.toJSONString(result_map));
        Assert.assertNotNull(result_map);
    }

}
