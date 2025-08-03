export interface SignupIncomingMessage {
    ip: string,
    publicKey: string,
    signedMessage: string,
    callbackId: string
}


export interface ValidateIncomingMessage {
    signedMessage: string,
    callbackId: string,
    status: 'good' | 'bad',
    latency: number,
    websiteId: string,
    validatorId: string
}

export interface SignupOutgoingMessage {
    callbackId: string,
    validatorId: string
}

export interface ValidateOutgoingMessage {
    url: string,
    callbackId: string,
    websiteId: string

}

export type IncomingMessage = {
    type: 'signup',
    data: SignupIncomingMessage
} | {
    type: 'validate',
    data: ValidateIncomingMessage
}

export type OutgoingMessage = {
    type: 'signup',
    data: SignupOutgoingMessage
} | {
    type: 'validate',
    data: ValidateOutgoingMessage
}