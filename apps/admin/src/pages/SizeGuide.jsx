import { Link } from 'react-router-dom';
import './HelpPages.css';

const SizeGuide = () => {
  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">SIZE GUIDE</span>
        </div>
        
        <div className="help-header">
          <h1>SIZE GUIDE</h1>
          <p>Find your perfect fit. Our garments are designed with a specific aesthetic in mind.</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>UNDERSTANDING OUR FIT</h2>
            <p>JATAYU pieces are intentionally designed with a modern, oversized aesthetic. If you prefer a more traditional, tailored fit, we recommend sizing down one size from your usual choice.</p>
          </div>

          <div className="help-section">
            <h2>TOPS & HOODIES (INCHES)</h2>
            <div className="size-table-container">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST</th>
                    <th>LENGTH</th>
                    <th>SHOULDER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>42"</td>
                    <td>26"</td>
                    <td>20"</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>44"</td>
                    <td>27"</td>
                    <td>21"</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>46"</td>
                    <td>28"</td>
                    <td>22"</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>48"</td>
                    <td>29"</td>
                    <td>23"</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>50"</td>
                    <td>30"</td>
                    <td>24"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="help-section">
            <h2>BOTTOMS & CARGOS (INCHES)</h2>
            <div className="size-table-container">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>WAIST</th>
                    <th>INSEAM</th>
                    <th>OUTSEAM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>28</td>
                    <td>29"</td>
                    <td>30"</td>
                    <td>40"</td>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td>31"</td>
                    <td>30"</td>
                    <td>41"</td>
                  </tr>
                  <tr>
                    <td>32</td>
                    <td>33"</td>
                    <td>32"</td>
                    <td>42"</td>
                  </tr>
                  <tr>
                    <td>34</td>
                    <td>35"</td>
                    <td>32"</td>
                    <td>43"</td>
                  </tr>
                  <tr>
                    <td>36</td>
                    <td>37"</td>
                    <td>34"</td>
                    <td>44"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="help-section">
            <h2>HOW TO MEASURE</h2>
            <ul>
              <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
              <li><strong>Length:</strong> Measure from the highest point of the shoulder down to the hem.</li>
              <li><strong>Waist:</strong> Measure around your natural waistline, where your trousers usually sit.</li>
              <li><strong>Inseam:</strong> Measure from the top of your inner thigh down to the bottom of the ankle.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
