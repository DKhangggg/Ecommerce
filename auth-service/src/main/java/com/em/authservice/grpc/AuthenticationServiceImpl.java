package com.em.authservice.grpc;

import com.em.authservice.dto.response.TokenValidResponse;
import com.em.authservice.service.AccountService;
import com.em.proto.AuthenticationServiceGrpc;
import com.em.proto.TokenResponse;
import com.em.proto.ValidateTokenRequest;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
public class AuthenticationServiceImpl extends AuthenticationServiceGrpc.AuthenticationServiceImplBase {
    private final AccountService accountService;

    @Override
    public void validateToken(ValidateTokenRequest request, StreamObserver<TokenResponse> responseObserver) {
        try {
            TokenValidResponse validationResponse = accountService.introspectToken(request.getToken());

            TokenResponse response = TokenResponse.newBuilder()
                    .setValid(validationResponse.isValid())
                    .setUsername(validationResponse.getUsername() != null ? validationResponse.getUsername() : "")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(io.grpc.Status.INTERNAL
                    .withDescription("Token validation failed: " + e.getMessage())
                    .asRuntimeException());
        }
    }
}
