package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.TemplateColumnAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TemplateColumn;
import com.mycompany.myapp.repository.TemplateColumnRepository;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link TemplateColumnResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TemplateColumnResourceIT {

    private static final String DEFAULT_TEMPLATE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEMPLATE_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/template-columns";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TemplateColumnRepository templateColumnRepository;

    @Autowired
    private MockMvc restTemplateColumnMockMvc;

    private TemplateColumn templateColumn;

    private TemplateColumn insertedTemplateColumn;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TemplateColumn createEntity() {
        return new TemplateColumn().templateName(DEFAULT_TEMPLATE_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TemplateColumn createUpdatedEntity() {
        return new TemplateColumn().templateName(UPDATED_TEMPLATE_NAME);
    }

    @BeforeEach
    public void initTest() {
        templateColumn = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedTemplateColumn != null) {
            templateColumnRepository.delete(insertedTemplateColumn);
            insertedTemplateColumn = null;
        }
    }

    @Test
    void createTemplateColumn() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TemplateColumn
        var returnedTemplateColumn = om.readValue(
            restTemplateColumnMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateColumn)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TemplateColumn.class
        );

        // Validate the TemplateColumn in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertTemplateColumnUpdatableFieldsEquals(returnedTemplateColumn, getPersistedTemplateColumn(returnedTemplateColumn));

        insertedTemplateColumn = returnedTemplateColumn;
    }

    @Test
    void createTemplateColumnWithExistingId() throws Exception {
        // Create the TemplateColumn with an existing ID
        templateColumn.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemplateColumnMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateColumn)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTemplateNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        templateColumn.setTemplateName(null);

        // Create the TemplateColumn, which fails.

        restTemplateColumnMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateColumn)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllTemplateColumns() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        // Get all the templateColumnList
        restTemplateColumnMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(templateColumn.getId())))
            .andExpect(jsonPath("$.[*].templateName").value(hasItem(DEFAULT_TEMPLATE_NAME)));
    }

    @Test
    void getTemplateColumn() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        // Get the templateColumn
        restTemplateColumnMockMvc
            .perform(get(ENTITY_API_URL_ID, templateColumn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(templateColumn.getId()))
            .andExpect(jsonPath("$.templateName").value(DEFAULT_TEMPLATE_NAME));
    }

    @Test
    void getNonExistingTemplateColumn() throws Exception {
        // Get the templateColumn
        restTemplateColumnMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingTemplateColumn() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateColumn
        TemplateColumn updatedTemplateColumn = templateColumnRepository.findById(templateColumn.getId()).orElseThrow();
        updatedTemplateColumn.templateName(UPDATED_TEMPLATE_NAME);

        restTemplateColumnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTemplateColumn.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedTemplateColumn))
            )
            .andExpect(status().isOk());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTemplateColumnToMatchAllProperties(updatedTemplateColumn);
    }

    @Test
    void putNonExistingTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, templateColumn.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(templateColumn))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(templateColumn))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateColumn)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTemplateColumnWithPatch() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateColumn using partial update
        TemplateColumn partialUpdatedTemplateColumn = new TemplateColumn();
        partialUpdatedTemplateColumn.setId(templateColumn.getId());

        partialUpdatedTemplateColumn.templateName(UPDATED_TEMPLATE_NAME);

        restTemplateColumnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTemplateColumn.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTemplateColumn))
            )
            .andExpect(status().isOk());

        // Validate the TemplateColumn in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTemplateColumnUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTemplateColumn, templateColumn),
            getPersistedTemplateColumn(templateColumn)
        );
    }

    @Test
    void fullUpdateTemplateColumnWithPatch() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateColumn using partial update
        TemplateColumn partialUpdatedTemplateColumn = new TemplateColumn();
        partialUpdatedTemplateColumn.setId(templateColumn.getId());

        partialUpdatedTemplateColumn.templateName(UPDATED_TEMPLATE_NAME);

        restTemplateColumnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTemplateColumn.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTemplateColumn))
            )
            .andExpect(status().isOk());

        // Validate the TemplateColumn in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTemplateColumnUpdatableFieldsEquals(partialUpdatedTemplateColumn, getPersistedTemplateColumn(partialUpdatedTemplateColumn));
    }

    @Test
    void patchNonExistingTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, templateColumn.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(templateColumn))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(templateColumn))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTemplateColumn() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateColumn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplateColumnMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(templateColumn)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TemplateColumn in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTemplateColumn() throws Exception {
        // Initialize the database
        insertedTemplateColumn = templateColumnRepository.save(templateColumn);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the templateColumn
        restTemplateColumnMockMvc
            .perform(delete(ENTITY_API_URL_ID, templateColumn.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return templateColumnRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected TemplateColumn getPersistedTemplateColumn(TemplateColumn templateColumn) {
        return templateColumnRepository.findById(templateColumn.getId()).orElseThrow();
    }

    protected void assertPersistedTemplateColumnToMatchAllProperties(TemplateColumn expectedTemplateColumn) {
        assertTemplateColumnAllPropertiesEquals(expectedTemplateColumn, getPersistedTemplateColumn(expectedTemplateColumn));
    }

    protected void assertPersistedTemplateColumnToMatchUpdatableProperties(TemplateColumn expectedTemplateColumn) {
        assertTemplateColumnAllUpdatablePropertiesEquals(expectedTemplateColumn, getPersistedTemplateColumn(expectedTemplateColumn));
    }
}
