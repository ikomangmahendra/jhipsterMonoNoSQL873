package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.TemplateProperties;
import com.mycompany.myapp.repository.TemplatePropertiesRepository;
import com.mycompany.myapp.service.TemplatePropertiesService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.TemplateProperties}.
 */
@Service
public class TemplatePropertiesServiceImpl implements TemplatePropertiesService {

    private static final Logger LOG = LoggerFactory.getLogger(TemplatePropertiesServiceImpl.class);

    private final TemplatePropertiesRepository templatePropertiesRepository;

    public TemplatePropertiesServiceImpl(TemplatePropertiesRepository templatePropertiesRepository) {
        this.templatePropertiesRepository = templatePropertiesRepository;
    }

    @Override
    public TemplateProperties save(TemplateProperties templateProperties) {
        LOG.debug("Request to save TemplateProperties : {}", templateProperties);
        return templatePropertiesRepository.save(templateProperties);
    }

    @Override
    public TemplateProperties update(TemplateProperties templateProperties) {
        LOG.debug("Request to update TemplateProperties : {}", templateProperties);
        return templatePropertiesRepository.save(templateProperties);
    }

    @Override
    public Optional<TemplateProperties> partialUpdate(TemplateProperties templateProperties) {
        LOG.debug("Request to partially update TemplateProperties : {}", templateProperties);

        return templatePropertiesRepository
            .findById(templateProperties.getId())
            .map(existingTemplateProperties -> {
                if (templateProperties.getLabel() != null) {
                    existingTemplateProperties.setLabel(templateProperties.getLabel());
                }

                return existingTemplateProperties;
            })
            .map(templatePropertiesRepository::save);
    }

    @Override
    public List<TemplateProperties> findAll() {
        LOG.debug("Request to get all TemplateProperties");
        return templatePropertiesRepository.findAll();
    }

    @Override
    public Optional<TemplateProperties> findOne(String id) {
        LOG.debug("Request to get TemplateProperties : {}", id);
        return templatePropertiesRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete TemplateProperties : {}", id);
        templatePropertiesRepository.deleteById(id);
    }
}
