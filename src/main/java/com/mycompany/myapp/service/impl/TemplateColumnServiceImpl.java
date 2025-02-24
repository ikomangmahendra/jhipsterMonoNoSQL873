package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.TemplateColumn;
import com.mycompany.myapp.repository.TemplateColumnRepository;
import com.mycompany.myapp.service.TemplateColumnService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.TemplateColumn}.
 */
@Service
public class TemplateColumnServiceImpl implements TemplateColumnService {

    private static final Logger LOG = LoggerFactory.getLogger(TemplateColumnServiceImpl.class);

    private final TemplateColumnRepository templateColumnRepository;

    public TemplateColumnServiceImpl(TemplateColumnRepository templateColumnRepository) {
        this.templateColumnRepository = templateColumnRepository;
    }

    @Override
    public TemplateColumn save(TemplateColumn templateColumn) {
        LOG.debug("Request to save TemplateColumn : {}", templateColumn);
        return templateColumnRepository.save(templateColumn);
    }

    @Override
    public TemplateColumn update(TemplateColumn templateColumn) {
        LOG.debug("Request to update TemplateColumn : {}", templateColumn);
        return templateColumnRepository.save(templateColumn);
    }

    @Override
    public Optional<TemplateColumn> partialUpdate(TemplateColumn templateColumn) {
        LOG.debug("Request to partially update TemplateColumn : {}", templateColumn);

        return templateColumnRepository
            .findById(templateColumn.getId())
            .map(existingTemplateColumn -> {
                if (templateColumn.getTemplateName() != null) {
                    existingTemplateColumn.setTemplateName(templateColumn.getTemplateName());
                }

                return existingTemplateColumn;
            })
            .map(templateColumnRepository::save);
    }

    @Override
    public List<TemplateColumn> findAll() {
        LOG.debug("Request to get all TemplateColumns");
        return templateColumnRepository.findAll();
    }

    @Override
    public Optional<TemplateColumn> findOne(String id) {
        LOG.debug("Request to get TemplateColumn : {}", id);
        return templateColumnRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete TemplateColumn : {}", id);
        templateColumnRepository.deleteById(id);
    }
}
