# Football Management team system API

## Context

This project had been made as a technical test for a job interview at [Shadow](https://shadow.tech/)

## Install project

Clone repository

```bash
git clone git@github.com:Thomasevano/foot-team-management-api.git
```

Go inside the folder

```bash
cd foot-team-management-api
```

Make sure to use [pnpm](https://pnpm.io/fr/)
Install dependencies

```bash
pnpm install
```

To run the project locally in developpment nothing simpler

```bash
pnpm run dev
```

### Deployment

To deploy the poject on your Kubernetes cluster, there is a Dockerfile that allow you to build a Docker Image

```bash
docker build -t foot-team-management-api .
```

Create a kubernetes cluster

```bash
kubectl apply -f foot-team-management-api.yml
```

To deploy it on a cluster I will have my docker Image uploaded on a docker registry, on Github for example.
That image will be build by the CI each time a merge on main branch is done, meaning we are sure of what we have done
This image update will automatically update my kubernetes cluster thanks to a spec in `kubernetes.yml` file:

```yaml
strategy:
    rollingUpdate:
      maxSurge: 1 # as an absolute number of replicas
      maxUnavailable: 33% # as % of replicas
    type: RollingUpdate
```

This rollingUpdate allow us to update our kubernetes cluster by just changing the image version with this command:

```bash
kubectl set image deployment/foot-team-management-api-demo foot-team-management-api-container=foot-team-management-api-image:1.2
```

if the image version is different than the one used in the kubernetes cluster it will update the cluster with this new version

So each time we want to update our app with new code we just need to do this command by specifying the version we want
We can imagine using a script that is linked to like a slack action and we can deploy new version in prodcution lightning fast
