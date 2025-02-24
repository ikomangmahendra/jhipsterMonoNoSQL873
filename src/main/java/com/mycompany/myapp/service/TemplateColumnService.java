package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TemplateColumn;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.TemplateColumn}.
 */
public interface TemplateColumnService {
    /**
     * Save a templateColumn.
     *
     * @param templateColumn the entity to save.
     * @return the persisted entity.
     */
    TemplateColumn save(TemplateColumn templateColumn);

    /**
     * Updates a templateColumn.
     *
     * @param templateColumn the entity to update.
     * @return the persisted entity.
     */
    TemplateColumn update(TemplateColumn templateColumn);

    /**
     * Partially updates a templateColumn.
     *
     * @param templateColumn the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TemplateColumn> partialUpdate(TemplateColumn templateColumn);

    /**
     * Get all the templateColumns.
     *
     * @return the list of entities.
     */
    List<TemplateColumn> findAll();

    /**
     * Get the "id" templateColumn.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TemplateColumn> findOne(String id);

    /**
     * Delete the "id" templateColumn.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
