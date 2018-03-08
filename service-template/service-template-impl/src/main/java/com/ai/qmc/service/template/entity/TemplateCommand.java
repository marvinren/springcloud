package com.ai.qmc.service.template.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class TemplateCommand {
    @Id
    @GeneratedValue
    Long id;

    String name;

    String command;
}
