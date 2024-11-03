# Kubernetes Showcase Project

This project demonstrates the deployment of a Dockerized application on a local Kubernetes cluster using **Minikube**. The setup includes deployments, services, a load balancer, and an optional Ingress controller for routing traffic. This project is designed to showcase Kubernetes skills with various ways to access the application.

---

## Prerequisites

- **Docker**: To build and run the app.
- **Minikube**: Local Kubernetes cluster tool.
- **kubectl**: Command-line tool for Kubernetes.
- **NGINX Ingress Controller**: Optional, for Ingress setup with Minikube.

---

## Minikube Installation and Setup

### Step 1: Install Minikube

#### macOS

Using **Homebrew**:

```bash
brew install minikube
```

#### Ubuntu

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

#### Windows

1. Download the Minikube installer from [Minikube’s official site](https://minikube.sigs.k8s.io/docs/start/).
2. Follow the instructions to complete the installation.

### Step 2: Install kubectl

#### macOS

```bash
brew install kubectl
```

#### Ubuntu

```bash
sudo apt update
sudo apt install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt update
sudo apt install -y kubectl
```

#### Windows

Download `kubectl` from [Kubernetes’ official site](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and follow the installation instructions.

### Step 3: Start Minikube

1. **Start Minikube**:

   ```bash
   minikube start
   ```

2. **Verify Minikube Status**:

   ```bash
   minikube status
   ```

This command will start a local Kubernetes cluster and give you access to it via `kubectl`.

---

## Project Structure

```plaintext
kubernetes-showcase/
├── app/
│   ├── Dockerfile           # Dockerfile for building the app
│   ├── app.js               # Node.js app code
│   ├── package.json         # Node.js dependencies
├── k8s-manifests/
│   ├── deployment.yaml      # Kubernetes Deployment for the app
│   ├── service.yaml         # Kubernetes Service to expose the app
│   ├── loadbalancer.yaml    # LoadBalancer Service (optional for local testing)
│   ├── ingress.yaml         # Ingress resource for NGINX routing
│   ├── configmap.yaml       # Optional ConfigMap for environment variables
│   └── secret.yaml          # Optional Secret for sensitive data
└── README.md
```

---

## Setup Instructions

### 1. Build and Push the Docker Image

1. **Build the Docker Image**:

   ```bash
   docker build -t kubernetes-showcase-app:1.0 ./app
   ```

2. **For Minikube Users**: Load the image directly into Minikube’s Docker environment:

   ```bash
   eval $(minikube docker-env)
   docker build -t kubernetes-showcase-app:1.0 ./app
   ```

3. **Optional**: If using Docker Hub, tag and push the image:

   ```bash
   docker tag kubernetes-showcase-app:1.0 <your-dockerhub-username>/kubernetes-showcase-app:1.0
   docker push <your-dockerhub-username>/kubernetes-showcase-app:1.0
   ```

---

### 2. Apply Kubernetes Manifests

1. **Deployment and Service**:

   ```bash
   kubectl apply -f k8s-manifests/deployment.yaml
   kubectl apply -f k8s-manifests/service.yaml
   ```

2. **LoadBalancer Service (Optional)**:

   To expose the application via LoadBalancer, apply the load balancer manifest:

   ```bash
   kubectl apply -f k8s-manifests/loadbalancer.yaml
   ```

3. **Ingress (Optional)**:

   To access the application using Ingress, first enable Ingress on Minikube:

   ```bash
   minikube addons enable ingress
   ```

   Then apply the Ingress manifest:

   ```bash
   kubectl apply -f k8s-manifests/ingress.yaml
   ```

---

## Accessing the Application

### Option 1: Using Port Forwarding with LoadBalancer

1. If you applied the `loadbalancer.yaml` manifest, you can access the application by port-forwarding:

   ```bash
   kubectl port-forward svc/kubernetes-showcase-lb 8080:80
   ```

2. Now, open your browser and visit `http://localhost:8080`.

### Option 2: Using Ingress with NGINX

1. Ensure that the Ingress addon is enabled for Minikube and that the Ingress manifest is applied.

2. Add an entry to your `/etc/hosts` file to route traffic to the Ingress IP:

   ```bash
   echo "$(minikube ip) kubernetes-showcase.local" | sudo tee -a /etc/hosts
   ```

3. Access the application by visiting `http://kubernetes-showcase.local` in your browser.

---

## Verifying the Setup

Use the following commands to check the status of your deployments and services:

```bash
kubectl get pods               # Check pod status
kubectl get svc                # Check service status
kubectl get deployments        # Check deployment status
kubectl get ingress            # Check ingress status (if using Ingress)
```

---

## Clean Up

To delete the resources created by this project, run:

```bash
kubectl delete -f k8s-manifests/
```
