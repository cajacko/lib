docker stop publish
docker rm publish

set -e

command="docker create"

# Get all the env keys and pass in from the host
str=$(egrep -v '^#' .env | xargs)
IFS=" "
ary=($str)
for key in "${!ary[@]}";
do
  str2="${ary[$key]}"
  IFS="="
  ary2=($str2)
  command="${command} -e ${ary2[0]}"
done

command="${command} -it --name=publish node:6.15.1-alpine sh /App/scripts/runPublish.sh"

# Execute the docker run command with all the env set
eval $command

docker cp . publish:/App
docker start publish
docker logs --follow publish
code=$(docker inspect publish --format='{{.State.ExitCode}}')
docker stop publish
docker rm publish

exit $code
