package io.sderp.ws.repository;

import io.sderp.ws.model.Template;
import io.sderp.ws.repository.mapper.TemplateMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateRepository {
    private TemplateMapper mapper;

    public TemplateRepository(TemplateMapper mapper) {
        this.mapper = mapper;
    }

    public Template selectTemplate(String templateId) { return mapper.selectTemplate(templateId); }

    public List<Template> selectAllTemplate() { return mapper.selectAllTemplate(); }

    public int insertTemplate(Template template) {
        return mapper.insertTemplate(template);
    }

    public int updateTemplate(Template template) { return mapper.updateTemplate(template); }
}
