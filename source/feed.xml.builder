xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title "Skabu Organics"
  xml.subtitle "Organic Health and Beauty Blog"
  xml.id "http://skabuorganics.com/"
  xml.link "href" => "http://skabuorganics.com/"
  xml.link "href" => "http://skabuorganics.com/feed.xml", "rel" => "self"
  xml.author { xml.name "Skabu Organics" }

  blog.articles[0..10].each do |article|
       xml.entry do
       xml.title article.title
       xml.link "rel" => "alternate", "href" => article.url
       xml.id article.url
       xml.published article.date.to_time.iso8601
       xml.updated article.date.to_time.iso8601
       xml.author { xml.name "Skabu Organics" }
       xml.summary article.summary, "type" => "html"
       xml.content article.body, "type" => "html"
     end
   end
end
