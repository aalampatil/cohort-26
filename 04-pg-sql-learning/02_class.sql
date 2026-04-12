CREATE TABLE how (
  student_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number CHAR(10) UNIQUE,
  age INT CHECK (age > 12),
  current_status VARCHAR(20) DEFAULT 'active' CHECK (
    current_status IN ('active', 'graduated', 'dropped_out', 'on_leave')
  ),
  masterji_handle VARCHAR(50) UNIQUE,
  has_joined_masterji BOOLEAN DEFAULT FALSE,
  current_score NUMERIC(5, 2) CHECK (
    current_score >= 0
    AND current_score <= 100
  ),
  enrollment_date DATE DEFAULT CURRENT_DATE
);