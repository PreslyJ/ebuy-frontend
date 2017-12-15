git stash -u
git checkout master
git pull origin master
docker build --force -rm -t node1:5000/ebuy-frontend-web .
docker push node1:5000/ebuy-frontend-web
