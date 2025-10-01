//package com.em.userservice.config;
//
//import com.em.proto.AuthenticationServiceGrpc;
//import io.grpc.ManagedChannel;
//import io.grpc.ManagedChannelBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class GrpcClientConfig {
//    @Bean
//    public ManagedChannel authChannel() {
//        return ManagedChannelBuilder.forAddress("localhost", 9090)
//                .usePlaintext()
//                .build();
//    }
//    @Bean
//    public AuthenticationServiceGrpc.AuthenticationServiceBlockingStub authStub(ManagedChannel authChannel) {
//        return AuthenticationServiceGrpc.newBlockingStub(authChannel);
//   }
//}
