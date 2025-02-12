package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.TemplateColumnTestSamples.*;
import static com.mycompany.myapp.domain.TemplatePropertiesTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TemplatePropertiesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateProperties.class);
        TemplateProperties templateProperties1 = getTemplatePropertiesSample1();
        TemplateProperties templateProperties2 = new TemplateProperties();
        assertThat(templateProperties1).isNotEqualTo(templateProperties2);

        templateProperties2.setId(templateProperties1.getId());
        assertThat(templateProperties1).isEqualTo(templateProperties2);

        templateProperties2 = getTemplatePropertiesSample2();
        assertThat(templateProperties1).isNotEqualTo(templateProperties2);
    }

    @Test
    void templateColumnTest() {
        TemplateProperties templateProperties = getTemplatePropertiesRandomSampleGenerator();
        TemplateColumn templateColumnBack = getTemplateColumnRandomSampleGenerator();

        templateProperties.setTemplateColumn(templateColumnBack);
        assertThat(templateProperties.getTemplateColumn()).isEqualTo(templateColumnBack);

        templateProperties.templateColumn(null);
        assertThat(templateProperties.getTemplateColumn()).isNull();
    }
}
