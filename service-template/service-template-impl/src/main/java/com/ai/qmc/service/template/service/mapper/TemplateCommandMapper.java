package com.ai.qmc.service.template.service.mapper;

import com.ai.qmc.service.template.entity.TemplateCommand;
import com.ai.qmc.service.template.service.dto.TemplateCommandDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * 如果需要注解的方式方法（@Autowired），需要增加componentModel = "spring"
 */
@Mapper(componentModel = "spring")
public interface TemplateCommandMapper {

    TemplateCommandMapper INSTANCE = Mappers.getMapper(TemplateCommandMapper.class);

    TemplateCommandDTO toDTO(TemplateCommand command);

    TemplateCommand fromDTO(TemplateCommandDTO dto);

}
