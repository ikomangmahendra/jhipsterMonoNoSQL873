package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.TemplatePropertiesAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TemplateProperties;
import com.mycompany.myapp.repository.TemplatePropertiesRepository;
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
 * Integration tests for the {@link TemplatePropertiesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TemplatePropertiesResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/template-properties";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TemplatePropertiesRepository templatePropertiesRepository;

    @Autowired
    private MockMvc restTemplatePropertiesMockMvc;

    private TemplateProperties templateProperties;

    private TemplateProperties insertedTemplateProperties;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TemplateProperties createEntity() {
        return new TemplateProperties().label(DEFAULT_LABEL);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TemplateProperties createUpdatedEntity() {
        return new TemplateProperties().label(UPDATED_LABEL);
    }

    @BeforeEach
    public void initTest() {
        templateProperties = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedTemplateProperties != null) {
            templatePropertiesRepository.delete(insertedTemplateProperties);
            insertedTemplateProperties = null;
        }
    }

    @Test
    void createTemplateProperties() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TemplateProperties
        var returnedTemplateProperties = om.readValue(
            restTemplatePropertiesMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateProperties)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TemplateProperties.class
        );

        // Validate the TemplateProperties in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertTemplatePropertiesUpdatableFieldsEquals(
            returnedTemplateProperties,
            getPersistedTemplateProperties(returnedTemplateProperties)
        );

        insertedTemplateProperties = returnedTemplateProperties;
    }

    @Test
    void createTemplatePropertiesWithExistingId() throws Exception {
        // Create the TemplateProperties with an existing ID
        templateProperties.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemplatePropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateProperties)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkLabelIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        templateProperties.setLabel(null);

        // Create the TemplateProperties, which fails.

        restTemplatePropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllTemplateProperties() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        // Get all the templatePropertiesList
        restTemplatePropertiesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(templateProperties.getId())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    void getTemplateProperties() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        // Get the templateProperties
        restTemplatePropertiesMockMvc
            .perform(get(ENTITY_API_URL_ID, templateProperties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(templateProperties.getId()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    void getNonExistingTemplateProperties() throws Exception {
        // Get the templateProperties
        restTemplatePropertiesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingTemplateProperties() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateProperties
        TemplateProperties updatedTemplateProperties = templatePropertiesRepository.findById(templateProperties.getId()).orElseThrow();
        updatedTemplateProperties.label(UPDATED_LABEL);

        restTemplatePropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTemplateProperties.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedTemplateProperties))
            )
            .andExpect(status().isOk());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTemplatePropertiesToMatchAllProperties(updatedTemplateProperties);
    }

    @Test
    void putNonExistingTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, templateProperties.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(templateProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(templateProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(templateProperties)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTemplatePropertiesWithPatch() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateProperties using partial update
        TemplateProperties partialUpdatedTemplateProperties = new TemplateProperties();
        partialUpdatedTemplateProperties.setId(templateProperties.getId());

        restTemplatePropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTemplateProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTemplateProperties))
            )
            .andExpect(status().isOk());

        // Validate the TemplateProperties in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTemplatePropertiesUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTemplateProperties, templateProperties),
            getPersistedTemplateProperties(templateProperties)
        );
    }

    @Test
    void fullUpdateTemplatePropertiesWithPatch() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the templateProperties using partial update
        TemplateProperties partialUpdatedTemplateProperties = new TemplateProperties();
        partialUpdatedTemplateProperties.setId(templateProperties.getId());

        partialUpdatedTemplateProperties.label(UPDATED_LABEL);

        restTemplatePropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTemplateProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTemplateProperties))
            )
            .andExpect(status().isOk());

        // Validate the TemplateProperties in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTemplatePropertiesUpdatableFieldsEquals(
            partialUpdatedTemplateProperties,
            getPersistedTemplateProperties(partialUpdatedTemplateProperties)
        );
    }

    @Test
    void patchNonExistingTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, templateProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(templateProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(templateProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTemplateProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        templateProperties.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTemplatePropertiesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(templateProperties)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TemplateProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTemplateProperties() throws Exception {
        // Initialize the database
        insertedTemplateProperties = templatePropertiesRepository.save(templateProperties);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the templateProperties
        restTemplatePropertiesMockMvc
            .perform(delete(ENTITY_API_URL_ID, templateProperties.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return templatePropertiesRepository.count();
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

    protected TemplateProperties getPersistedTemplateProperties(TemplateProperties templateProperties) {
        return templatePropertiesRepository.findById(templateProperties.getId()).orElseThrow();
    }

    protected void assertPersistedTemplatePropertiesToMatchAllProperties(TemplateProperties expectedTemplateProperties) {
        assertTemplatePropertiesAllPropertiesEquals(expectedTemplateProperties, getPersistedTemplateProperties(expectedTemplateProperties));
    }

    protected void assertPersistedTemplatePropertiesToMatchUpdatableProperties(TemplateProperties expectedTemplateProperties) {
        assertTemplatePropertiesAllUpdatablePropertiesEquals(
            expectedTemplateProperties,
            getPersistedTemplateProperties(expectedTemplateProperties)
        );
    }
}
