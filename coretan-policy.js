search

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::147604133037:role/ap-southeast-1_iur98AeIY-authRole"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:ap-southeast-1:147604133037:domain/digipress-es-live/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::147604133037:role/baktikominfopesantrenv1LambdaRole729ab451-live"
      },
      "Action": [
        "es:ESHttpDelete",
        "es:ESHttpHead",
        "es:ESHttpGet",
        "es:ESHttpPost",
        "es:ESHttpPut"
      ],
      "Resource": "arn:aws:es:ap-southeast-1:147604133037:domain/digipress-es-live/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::147604133037:role/baktikominfopesantrenv1PreTokenGeneration-live"
      },
      "Action": "es:ESHttpGet",
      "Resource": "arn:aws:es:ap-southeast-1:147604133037:domain/digipress-es-live/*"
    }
  ]
}

copy bucket from other account

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCopy",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::607380331963:user/digipress"
            },
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::baktikominfo-pesantrenv181f9e408111a40b7aff79aclive-live/*",
                "arn:aws:s3:::baktikominfo-pesantrenv181f9e408111a40b7aff79aclive-live"
            ]
        }
    ]
}

aws s3 cp s3://digipressv1-backup s3://digipressv1.1-backup  --region ap-southeast-1 --acl bucket-owner-full-control --recursive