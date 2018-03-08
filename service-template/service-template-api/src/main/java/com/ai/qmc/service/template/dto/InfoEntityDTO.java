package com.ai.qmc.service.template.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class InfoEntityDTO implements Serializable {

    String name;
    String version;
}
