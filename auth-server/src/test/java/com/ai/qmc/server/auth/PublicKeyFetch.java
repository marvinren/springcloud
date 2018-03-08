package com.ai.qmc.server.auth;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import java.security.KeyPair;
import java.security.interfaces.RSAPublicKey;
import org.springframework.security.crypto.codec.Base64;


/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.server.auth
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/2/28 16:37
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/2/28 16:37
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
public class PublicKeyFetch {
    public static void main(String[] args) {
        Resource resource = new ClassPathResource("kevin_key.jks");
        KeyPair keyPair = new KeyStoreKeyFactory(resource, "123456".toCharArray()).getKeyPair("kevin_key");
        RSAPublicKey key = (RSAPublicKey)keyPair.getPublic();
        System.out.println(key);
        String verifierKey = "-----BEGIN PUBLIC KEY-----\n" + new String(Base64.encode(key.getEncoded()))
                + "\n-----END PUBLIC KEY-----";
        System.out.println(verifierKey);
    }
}
