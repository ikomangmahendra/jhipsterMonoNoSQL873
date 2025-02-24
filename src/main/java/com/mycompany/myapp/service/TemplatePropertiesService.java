package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TemplateProperties;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.TemplateProperties}.
 */
public interface TemplatePropertiesService {
    /**
     * Save a templateProperties.
     *
     * @param templateProperties the entity to save.
     * @return the persisted entity.
     */
    TemplateProperties save(TemplateProperties templateProperties);

    /**
     * Updates a templateProperties.
     *
     * @param templateProperties the entity to update.
     * @return the persisted entity.
     */
    TemplateProperties update(TemplateProperties templateProperties);

    /**
     * Partially updates a templateProperties.
     *
     * @param templateProperties the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TemplateProperties> partialUpdate(TemplateProperties templateProperties);

    /**
     * Get all the templateProperties.
     *
     * @return the list of entities.
     */
    List<TemplateProperties> findAll();

    /**
     * Get the "id" templateProperties.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TemplateProperties> findOne(String id);

    /**
     * Delete the "id" templateProperties.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
