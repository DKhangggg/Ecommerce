package com.em.productservice.events;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventPublisherService {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    public void publishEvent(String topic,String key , Object event){
        log.info("Publishing event[{}] to topic : {}", event.getClass().getSimpleName(), topic);
        kafkaTemplate.send(topic,key,event);
    }


}
