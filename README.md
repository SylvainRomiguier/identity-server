# identity-server
a clean architecture authentication microservice in Typescript

Developping an authentication microservice with clean architecture and dependance injections.

* domain : 
entities and useCases => pure business logic with no import at all (useCases only depends on Entities and Entities depends on nothing).
You should understand what this microservice does only by reading these useCases.
The repository is injected through the IRepository interface to not depend on a specific implementation.
* api : the api controllers => useCases and router are injected which means for example that you can inject fastify or express as the router
* infrastructure:
  * repositories :
  where the persistence logic is.
  Each repository must implements IRepository interface.
    * mockupRepository : an example of repository with file.
  * routers :
  where the implementations of IRouter are, for now : 
    * fastify (check how the fastify implementation is customized to handle the fastify-swagger plugin and schemas, swagger available at http://localhost:5000/documentation)
    * express

  this way, every third-part libraries are in the most external layer (infrastructure)

  So we have dependencies like these :
  Entities <- UseCases <- Controllers <- Infrastructure

  this means that you only have to change what library, function, etc. you want to inject (eventually create an adapter to fit IRouter, IRepository, etc.) in server.ts file and you have nothing to change in the business logic.

To test it :
* create at root directory a .env file with the following informations :
MONGODB_CONNECTION_STRING=
TOKEN_KEYS_PATH=

where the first is your connection string to your MongoDB users and the second the path (with a trailing /) to the directory containing the files token.key and token.key.pub, respectively private key and public key to sign and verify the token for authorization.

On my K8s cluster these informations are stored in Secrets and declared as follow :

    spec:
      containers:
      - name: identity-server
        image: prosperosyko/identity-server
        ports:
        - containerPort: 5000
          protocol: TCP
        volumeMounts:
        - name: ssh-key
          readOnly: true
          mountPath: '/root/.ssh/'
        env:
        - name: MONGODB_CONNECTION_STRING
          valueFrom:
            secretKeyRef:
              name: mongodb-connection-string
              key: mongodb-connection-string
        - name: TOKEN_KEYS_PATH
          value: /root/.ssh/
      volumes:
        - name: ssh-key
          secret: 
            secretName: token-keys

* either install packages, compile fron TS to JS and run
  1. yarn install
  2. yarn run dev
* or using docker
  1. docker build . -t identity-server
  2. docker run -p 5000:5000 identity-server
* Send http request on http://localhost:5000 (you can see a swagger at http://localhost:5000/documentation)

