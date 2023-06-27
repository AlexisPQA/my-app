import { useDeferredValue, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./App.css";
import useProduct from "./customhooks/useProduct";

function App() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(20);
  const deferredQuery = useDeferredValue(query);
  const { products, hasMore } = useProduct(deferredQuery, limit);
  const { ref, inView } = useInView();

  useEffect(() => {
    setLimit(20);
  }, [query]);

  useEffect(() => {
    if (inView) {
      if (hasMore) {
        setLimit((prev) => prev + 20);
      }
    }
  }, [inView, hasMore]);

  return (
    <div className="App">
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div>
        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div
                key={product.title + index}
                ref={ref}
                style={{
                  backgroundColor: "#ccc",
                  marginBottom: "20px",
                }}
              >
                <p>{product.title}</p>
                <p>{product.price}</p>
                <img alt="" src={product.images[0]} width={100} height={100} />
              </div>
            );
          }
          return (
            <div
              key={product.title + index}
              style={{
                backgroundColor: "#ccc",
                marginBottom: "20px",
              }}
            >
              <p>{product.title}</p>
              <p>{product.price}</p>
              <img alt="" src={product.images[0]} width={100} height={100} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
