package com.mycompany.myapp.domain;

import java.util.UUID;

public class TemplatePropertiesTestSamples {

    public static TemplateProperties getTemplatePropertiesSample1() {
        return new TemplateProperties().id("id1").label("label1");
    }

    public static TemplateProperties getTemplatePropertiesSample2() {
        return new TemplateProperties().id("id2").label("label2");
    }

    public static TemplateProperties getTemplatePropertiesRandomSampleGenerator() {
        return new TemplateProperties().id(UUID.randomUUID().toString()).label(UUID.randomUUID().toString());
    }
}
