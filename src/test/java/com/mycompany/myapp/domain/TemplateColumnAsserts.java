package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class TemplateColumnAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTemplateColumnAllPropertiesEquals(TemplateColumn expected, TemplateColumn actual) {
        assertTemplateColumnAutoGeneratedPropertiesEquals(expected, actual);
        assertTemplateColumnAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTemplateColumnAllUpdatablePropertiesEquals(TemplateColumn expected, TemplateColumn actual) {
        assertTemplateColumnUpdatableFieldsEquals(expected, actual);
        assertTemplateColumnUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTemplateColumnAutoGeneratedPropertiesEquals(TemplateColumn expected, TemplateColumn actual) {
        assertThat(actual)
            .as("Verify TemplateColumn auto generated properties")
            .satisfies(a -> assertThat(a.getId()).as("check id").isEqualTo(expected.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTemplateColumnUpdatableFieldsEquals(TemplateColumn expected, TemplateColumn actual) {
        assertThat(actual)
            .as("Verify TemplateColumn relevant properties")
            .satisfies(a -> assertThat(a.getTemplateName()).as("check templateName").isEqualTo(expected.getTemplateName()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTemplateColumnUpdatableRelationshipsEquals(TemplateColumn expected, TemplateColumn actual) {
        // empty method
    }
}
