#!/bin/bash

react-scripts build

echo "copy to remote..."

host="ubuntu@ec2-52-62-149-101.ap-southeast-2.compute.amazonaws.com"
pem_path="/Users/arturmich/.ssh/loyaltyland-eb-ssh"
current_env=$REACT_APP_ENVIRONMENT
remote_path="/opt/bitnami/apps/wordpress/htdocs/dashboard-$current_env"
build_path="./build"
echo "remove remote build folder ($remote_path)..."
ssh -i $pem_path ubuntu@ec2-52-62-149-101.ap-southeast-2.compute.amazonaws.com "ls $remote_path/ && rm -r $remote_path/"
echo "create remote build folder ($remote_path)..."
ssh -i $pem_path ubuntu@ec2-52-62-149-101.ap-southeast-2.compute.amazonaws.com "mkdir $remote_path"
echo "copy local files ($build_path) to remote build folder ($remote_path)..."
scp -i $pem_path -r $build_path/* $host:$remote_path/
echo "...DONE!"
