package com.ai.qmc.service.template.repository;

import com.ai.qmc.service.template.entity.TemplateCommand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateCommandRepository extends JpaRepository<TemplateCommand, Long> {
}
