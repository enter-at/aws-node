import {
    ALBEvent,
    ALBHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceHandler,
    CloudFrontRequestHandler,
    CloudFrontResponseHandler,
    CloudWatchLogsEvent,
    CloudWatchLogsHandler,
    CloudWatchLogsLogEvent,
    CodePipelineCloudWatchActionHandler,
    CodePipelineCloudWatchHandler,
    CodePipelineCloudWatchPipelineHandler,
    CodePipelineCloudWatchStageHandler,
    CognitoUserPoolEvent,
    CognitoUserPoolTriggerHandler,
    Context,
    CustomAuthorizerEvent,
    CustomAuthorizerHandler,
    DynamoDBStreamEvent,
    DynamoDBStreamHandler,
    FirehoseTransformationHandler,
    KinesisStreamHandler,
    LexHandler,
    S3BatchEvent,
    S3BatchHandler,
    S3Event,
    S3Handler,
    ScheduledEvent,
    ScheduledHandler,
    SNSEvent,
    SNSHandler,
    SQSHandler,
} from "aws-lambda";
import { Format } from "../format/Format";
import * as inputFormat from "../format/InputFormat";
import * as outputFormat from "../format/OutputFormat";

export interface BaseHandlerArguments {
    inputFormat?: Format;
    outputFormat?: Format;
}

type Event =
    | ALBEvent
    | APIGatewayProxyEvent
    | CloudFormationCustomResourceEvent
    | CloudWatchLogsEvent
    | CloudWatchLogsLogEvent
    | CognitoUserPoolEvent
    | CustomAuthorizerEvent
    | DynamoDBStreamEvent
    | S3BatchEvent
    | S3Event
    | SNSEvent
    | ScheduledEvent;

type Handler =
    | ALBHandler
    | APIGatewayProxyHandler
    | CloudFormationCustomResourceHandler
    | CloudFrontRequestHandler
    | CloudFrontResponseHandler
    | CloudWatchLogsHandler
    | CodePipelineCloudWatchActionHandler
    | CodePipelineCloudWatchHandler
    | CodePipelineCloudWatchPipelineHandler
    | CodePipelineCloudWatchStageHandler
    | CognitoUserPoolTriggerHandler
    | CustomAuthorizerHandler
    | DynamoDBStreamHandler
    | FirehoseTransformationHandler
    | KinesisStreamHandler
    | LexHandler
    | S3BatchHandler
    | S3Handler
    | SNSHandler
    | SQSHandler
    | ScheduledHandler;

export abstract class BaseHandler {
    protected inputFormat: Format;
    protected outputFormat: Format;

    constructor(args?: BaseHandlerArguments) {
        this.inputFormat = args?.inputFormat ?? inputFormat.json;
        this.outputFormat = args?.outputFormat ?? outputFormat.json;
    }

    public decorator(
        _target: unknown,
        _propertyName: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor {
        propertyDescriptor.value = this.wrapper(propertyDescriptor.value);
        return propertyDescriptor;
    }

    public wrapper(method: (input: unknown, context: Context) => unknown): Handler {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const handler = this;
        return async function fn(event: Event, context: Context): Promise<unknown> {
            try {
                return handler.after(await method.apply(handler, handler.before(event, context)));
            } catch (err) {
                return handler.onException(err);
            }
        };
    }

    protected before(event: Event, context: Context): [unknown, Context] {
        return [this.formatInput(event), context];
    }

    protected after(output: unknown): unknown {
        return this.formatOutput(output);
    }

    protected onException(exception: Error): unknown {
        throw exception;
    }

    protected formatInput(input: Event): unknown {
        return this.inputFormat.apply(input);
    }

    protected formatOutput<T>(output: unknown): unknown {
        return this.outputFormat.apply(output);
    }
}
