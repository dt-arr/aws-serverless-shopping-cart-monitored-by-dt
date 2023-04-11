# amplifyconsole-backend-role IAM Role Permissions:

### Policies:

### AWS Managed Policies

#### AdministratorAccess-Amplify

Keep this AWS managed policy intact.
Policy ARN: arn:aws:iam::aws:policy/AdministratorAccess-Amplify
Description: Grants account administrative permissions while explicitly allowing direct access to resources needed by Amplify applications.

### Customer Managed Policies:

#### Amplifypolicyupdate

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ssm:PutParameter",
                "ssm:DeleteParameter",
                "ssm:GetParametersByPath",
                "ssm:GetParameters",
                "ssm:GetParameter",
                "ssm:DeleteParameters",
                "ssm:RemoveTagsFromResource",
                "ssm:AddTagsToResource"
            ],
            "Resource": [
                "arn:aws:ssm:*:*:parameter/serverless-shopping-cart-demo/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:PutParameter",
                "ssm:DeleteParameter",
                "ssm:GetParametersByPath",
                "ssm:GetParameters",
                "ssm:GetParameter",
                "ssm:DeleteParameters",
                "ssm:RemoveTagsFromResource",
                "ssm:AddTagsToResource"
            ],
            "Resource": [
                "arn:aws:ssm:*:*:parameter/dt/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": "cloudformation:CreateChangeSet",
            "Resource": "arn:aws:cloudformation:*:aws:transform/Serverless-2016-10-31"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:ListVersionsByFunction",
                "lambda:CreateAlias",
                "lambda:DeleteAlias",
                "lambda:PutFunctionConcurrency"
            ],
            "Resource": "arn:aws:lambda:*:*:function:amplify*"
        }
    ]
}
```

#### LambdaUpdateAlias

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CLICloudformationPolicy",
            "Effect": "Allow",
            "Action": [
                "lambda:updateAlias"
            ],
            "Resource": [
                "arn:aws:cloudformation:*:*:stack/amplify-*"
            ]
        },
        {
            "Sid": "CLIManageviaCFNPolicy",
            "Effect": "Allow",
            "Action": [
                "lambda:updateAlias"
            ],
            "Resource": "*",
            "Condition": {
                "ForAnyValue:StringEquals": {
                    "aws:CalledVia": [
                        "cloudformation.amazonaws.com"
                    ]
                }
            }
        },
        {
            "Sid": "CLISDKCalls",
            "Effect": "Allow",
            "Action": [
                "lambda:updateAlias"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AmplifySSMCalls",
            "Effect": "Allow",
            "Action": [
                "lambda:updateAlias"
            ],
            "Resource": "arn:aws:ssm:*:*:parameter/amplify/*"
        },
        {
            "Sid": "GeoPowerUser",
            "Effect": "Allow",
            "Action": [
                "geo:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AmplifyStorageSDKCalls",
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:DeleteBucket",
                "s3:DeleteBucketPolicy",
                "s3:DeleteBucketWebsite",
                "s3:DeleteObject",
                "s3:DeleteObjectVersion",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListAllMyBuckets",
                "s3:ListBucket",
                "s3:ListBucketVersions",
                "s3:PutBucketAcl",
                "s3:PutBucketCORS",
                "s3:PutBucketNotification",
                "s3:PutBucketPolicy",
                "s3:PutBucketVersioning",
                "s3:PutBucketWebsite",
                "s3:PutEncryptionConfiguration",
                "s3:PutLifecycleConfiguration",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AmplifySSRCalls",
            "Effect": "Allow",
            "Action": [
                "lambda:updateAlias",
                "lambda:DeleteFunctionConcurrency"
            ],
            "Resource": "arn:aws:lambda:*:*:function:amplify-aws-serverless*"
        },
        {
            "Sid": "AmplifySSRViewLogGroups",
            "Effect": "Allow",
            "Action": "logs:DescribeLogGroups",
            "Resource": "arn:aws:logs:*:*:log-group:*"
        },
        {
            "Sid": "AmplifySSRCreateLogGroup",
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:*:*:log-group:/aws/amplify/*"
        },
        {
            "Sid": "AmplifySSRPushLogs",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:log-group:/aws/amplify/*:log-stream:*"
        }
    ]
}
```