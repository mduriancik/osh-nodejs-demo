https://192.168.42.80:8443

oc login -u system:admin

oc get pods --all-namespaces

oc project devt

oc tag osh-nodejs-demo:latest osh-nodejs-demo:prod

oc new-app devt/osh-nodejs-demo:1.0.1-prod -n prod
