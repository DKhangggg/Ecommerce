//package com.em.userservice.grpc;
//
//
//import com.em.proto.AuthenticationServiceGrpc;
//import com.em.proto.ValidateTokenRequest;
//import com.em.userservice.dto.response.TokenValidResponse;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthServiceGRPC {
//    private final AuthenticationServiceGrpc.AuthenticationServiceBlockingStub authSub;
//
//    public AuthServiceGRPC(AuthenticationServiceGrpc.AuthenticationServiceBlockingStub authSub) {
//        this.authSub = authSub;
//    }
//
//    public TokenValidResponse getToken(String token) {
//        var request = ValidateTokenRequest.newBuilder().setToken(token).build();
//        var responsestub = authSub.validateToken(request);
//
//        return TokenValidResponse.builder()
//                .valid(responsestub.getValid())
//                .username(responsestub.getUsername())
//                .build();
//    }
//}
