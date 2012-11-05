---
layout: post
title: ElasticSearch the POJO Style
tags: [elasticsearch, search, jackson]
---


This article will show you how to handle POJOs in ElasticSearch with Jackson. 
People familiar with Solrj may know the `@Field` annotation there for them to dealing with the POJOs easily.
After reading this you can do the same thing in ElasticSearch.

First it relies on the Jackson data binding module. Here the Maven dependency

    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.1.0</version>
    </dependency>

Create a Java Bean annotated with Jackson annotations.

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonProperty;
    
    public class Pojo {
      private String id;
      @JsonIgnore private String ignore;
      @JsonProperty("username") private String name;
      // omit getters setters.
    }  

Create a method to play the POJO style ElasticSearch.

    public class Pojoes {
      static ObjectMapper mapper = new ObjectMapper();
      
      public static void main(String[] args) throws IOException {
        Node node = NodeBuilder.nodeBuilder().node();   // create a default node.
        Client client = node.client();
        
        client.admin().indices().prepareDelete().execute().actionGet();
        String mapId = "{\"pojo\": { \"_id\": { \"path\": \"id\" } } }";  // { "pojo": { "_id": { "path": "id" } } }"
        client.admin().indices().prepareCreate("pojoes").addMapping("pojo", mapId).execute().actionGet();
        
        Pojo pojo = new Pojo();
        pojo.setId("123").setName("trgoofi").setIgnore("this field will be ingoned");
        
        client.prepareIndex("pojoes", "pojo").setSource(mapper.writeValueAsBytes(pojo)).execute().actionGet();
        
        GetResponse response = client.prepareGet("pojoes", "pojo", "123").execute().actionGet();
        Pojo pojoBack = mapper.readValue(response.getSourceAsBytes(), Pojo.class);
        
        System.out.println(pojoBack.getName());     // trgoofi
        System.out.println(pojoBack.getIgnore());   // null
      }
    }

After `client.prepareIndex("pojoes", "pojo").setSource(mapper.writeValueAsBytes(pojo)).execute().actionGet();` 
you will have a document like below indexed by ElaticSearch. 
Find this out by execute `curl -XGET 'http://localhost:9200/pojoes/pojo/123?pretty=true'` or open the [URL] in a browser.
(In order to play with this demo you need to apply some breakpoints and run it in debug mode.)
 
    {
      _index: "pojoes",
      _type: "pojo",
      _id: "123",
      _version: 1,
      exists: true,
      _source: {
        id: "123",
        username: "trgoofi"
      }
    }

As the `Pojo` class describe, you can see only two fields indexed (id, username), 
with Jackson Annotation you can change property names as `name` became `username`
and ignore fields like the  `ignore` field did.

The tricks all about are:
1. `ObjectMapper.writeValueAsBytes(...)` convert a Java Bean to JSON document as ElasticSearch needed.
2. `ObjectMapper.readValue(...)` get a Java Bean back from a JSON document provided.

Now you know the tricks to make codes much more concise and most important is it make life lot more easier, 
you don't have to write codes dealing with the annoying stuff any more. This kind of like the ORM frameworks for you.

## Resources and References

1. [pojo-elasticsearch-demo](https://github.com/trgoofi/pojo-elasticsearch-demo "pojo-elasticsearch-demo"). 
2. [Jackson data binding module](https://github.com/FasterXML/jackson-databind "jackson-databind").
4. [Id field mapping Guide](http://www.elasticsearch.org/guide/reference/mapping/id-field.html "More detail about mapId above").
5. [ElasticSearch Java Client Guide](http://www.elasticsearch.org/guide/reference/java-api/client.html).

[URL]: http://localhost:9200/pojoes/pojo/123?pretty=true