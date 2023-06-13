- NITI.AI BACKEND TASK
    - DATE : 13-06-23

Raghavendra Kokkaraipalli
f20190120@hyderabad.bits-pilani.ac.in
8977664489

Consent APIs

        - consent POST
            - Creates a consent with the parameters passed in the body
            - Mandatory Body params -> Phone numeber (attr : mobileNumber)
            - Headers are Mandatory for Authorization

        - consent GET
            - Fetches the details of the consent from the consent ID
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization

Data Fetch APIs

        - data GET
            - Creates Data session from the consent ID (only if the consent is ACTIVE)
            - Fetches the Data from the data directly from the data session ID
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization 
        
        - dataSession POST
            - Creates a Data Session from the consent ID (only if the consent is ACTIVE)
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization 

        - getData GET
            - Fetches the data from the created data session\
            - Mandatory path params -> Data session ID (attr : id)
            - Headers are Mandatory for Authorization

        - fiuList GET
            - Fetches the list of FIUs
            - Headers are Mandatory for Authorization
