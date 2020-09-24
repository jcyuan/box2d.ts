export declare const b2_pi_over_180: number;
export declare const b2_180_over_pi: number;
export declare const b2_two_pi: number;
export declare const b2Abs: (x: number) => number;
export declare function b2Min(a: number, b: number): number;
export declare function b2Max(a: number, b: number): number;
export declare function b2Clamp(a: number, lo: number, hi: number): number;
export declare function b2Swap<T>(a: T[], b: T[]): void;
export declare const b2IsValid: typeof isFinite;
export declare function b2Sq(n: number): number;
export declare function b2InvSqrt(n: number): number;
export declare const b2Sqrt: (x: number) => number;
export declare const b2Pow: (x: number, y: number) => number;
export declare function b2DegToRad(degrees: number): number;
export declare function b2RadToDeg(radians: number): number;
export declare const b2Cos: (x: number) => number;
export declare const b2Sin: (x: number) => number;
export declare const b2Acos: (x: number) => number;
export declare const b2Asin: (x: number) => number;
export declare const b2Atan2: (y: number, x: number) => number;
export declare function b2NextPowerOfTwo(x: number): number;
export declare function b2IsPowerOfTwo(x: number): boolean;
export declare function b2Random(): number;
export declare function b2RandomRange(lo: number, hi: number): number;
export interface XY {
    x: number;
    y: number;
}
export declare class b2Vec2 implements XY {
    static readonly ZERO: Readonly<b2Vec2>;
    static readonly UNITX: Readonly<b2Vec2>;
    static readonly UNITY: Readonly<b2Vec2>;
    static readonly s_t0: b2Vec2;
    static readonly s_t1: b2Vec2;
    static readonly s_t2: b2Vec2;
    static readonly s_t3: b2Vec2;
    readonly data: Float32Array;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor();
    constructor(data: Float32Array);
    constructor(x: number, y: number);
    Clone(): b2Vec2;
    SetZero(): this;
    Set(x: number, y: number): this;
    Copy(other: XY): this;
    SelfAdd(v: XY): this;
    SelfAddXY(x: number, y: number): this;
    SelfSub(v: XY): this;
    SelfSubXY(x: number, y: number): this;
    SelfMul(s: number): this;
    SelfMulAdd(s: number, v: XY): this;
    SelfMulSub(s: number, v: XY): this;
    Dot(v: XY): number;
    Cross(v: XY): number;
    Length(): number;
    LengthSquared(): number;
    Normalize(): number;
    SelfNormalize(): this;
    SelfRotate(radians: number): this;
    SelfRotateCosSin(c: number, s: number): this;
    IsValid(): boolean;
    SelfCrossVS(s: number): this;
    SelfCrossSV(s: number): this;
    SelfMinV(v: XY): this;
    SelfMaxV(v: XY): this;
    SelfAbs(): this;
    SelfNeg(): this;
    SelfSkew(): this;
    static MakeArray(length: number): b2Vec2[];
    static AbsV<T extends XY>(v: XY, out: T): T;
    static MinV<T extends XY>(a: XY, b: XY, out: T): T;
    static MaxV<T extends XY>(a: XY, b: XY, out: T): T;
    static ClampV<T extends XY>(v: XY, lo: XY, hi: XY, out: T): T;
    static RotateV<T extends XY>(v: XY, radians: number, out: T): T;
    static DotVV(a: XY, b: XY): number;
    static CrossVV(a: XY, b: XY): number;
    static CrossVS<T extends XY>(v: XY, s: number, out: T): T;
    static CrossVOne<T extends XY>(v: XY, out: T): T;
    static CrossSV<T extends XY>(s: number, v: XY, out: T): T;
    static CrossOneV<T extends XY>(v: XY, out: T): T;
    static AddVV<T extends XY>(a: XY, b: XY, out: T): T;
    static SubVV<T extends XY>(a: XY, b: XY, out: T): T;
    static MulSV<T extends XY>(s: number, v: XY, out: T): T;
    static MulVS<T extends XY>(v: XY, s: number, out: T): T;
    static AddVMulSV<T extends XY>(a: XY, s: number, b: XY, out: T): T;
    static SubVMulSV<T extends XY>(a: XY, s: number, b: XY, out: T): T;
    static AddVCrossSV<T extends XY>(a: XY, s: number, v: XY, out: T): T;
    static MidVV<T extends XY>(a: XY, b: XY, out: T): T;
    static ExtVV<T extends XY>(a: XY, b: XY, out: T): T;
    static IsEqualToV(a: XY, b: XY): boolean;
    static DistanceVV(a: XY, b: XY): number;
    static DistanceSquaredVV(a: XY, b: XY): number;
    static NegV<T extends XY>(v: XY, out: T): T;
}
export declare const b2Vec2_zero: Readonly<b2Vec2>;
export interface XYZ extends XY {
    z: number;
}
export declare class b2Vec3 implements XYZ {
    static readonly ZERO: Readonly<b2Vec3>;
    static readonly s_t0: b2Vec3;
    readonly data: Float32Array;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    constructor();
    constructor(data: Float32Array);
    constructor(x: number, y: number, z: number);
    Clone(): b2Vec3;
    SetZero(): this;
    SetXYZ(x: number, y: number, z: number): this;
    Copy(other: XYZ): this;
    SelfNeg(): this;
    SelfAdd(v: XYZ): this;
    SelfAddXYZ(x: number, y: number, z: number): this;
    SelfSub(v: XYZ): this;
    SelfSubXYZ(x: number, y: number, z: number): this;
    SelfMul(s: number): this;
    static DotV3V3(a: XYZ, b: XYZ): number;
    static CrossV3V3<T extends XYZ>(a: XYZ, b: XYZ, out: T): T;
}
export declare class b2Mat22 {
    static readonly IDENTITY: Readonly<b2Mat22>;
    readonly data: Float32Array;
    readonly ex: b2Vec2;
    readonly ey: b2Vec2;
    Clone(): b2Mat22;
    static FromVV(c1: XY, c2: XY): b2Mat22;
    static FromSSSS(r1c1: number, r1c2: number, r2c1: number, r2c2: number): b2Mat22;
    static FromAngle(radians: number): b2Mat22;
    SetSSSS(r1c1: number, r1c2: number, r2c1: number, r2c2: number): this;
    SetVV(c1: XY, c2: XY): this;
    SetAngle(radians: number): this;
    Copy(other: b2Mat22): this;
    SetIdentity(): this;
    SetZero(): this;
    GetAngle(): number;
    GetInverse(out: b2Mat22): b2Mat22;
    Solve<T extends XY>(b_x: number, b_y: number, out: T): T;
    SelfAbs(): this;
    SelfInv(): this;
    SelfAddM(M: b2Mat22): this;
    SelfSubM(M: b2Mat22): this;
    static AbsM(M: b2Mat22, out: b2Mat22): b2Mat22;
    static MulMV<T extends XY>(M: b2Mat22, v: XY, out: T): T;
    static MulTMV<T extends XY>(M: b2Mat22, v: XY, out: T): T;
    static AddMM(A: b2Mat22, B: b2Mat22, out: b2Mat22): b2Mat22;
    static MulMM(A: b2Mat22, B: b2Mat22, out: b2Mat22): b2Mat22;
    static MulTMM(A: b2Mat22, B: b2Mat22, out: b2Mat22): b2Mat22;
}
export declare class b2Mat33 {
    static readonly IDENTITY: Readonly<b2Mat33>;
    readonly data: Float32Array;
    readonly ex: b2Vec3;
    readonly ey: b2Vec3;
    readonly ez: b2Vec3;
    Clone(): b2Mat33;
    SetVVV(c1: XYZ, c2: XYZ, c3: XYZ): this;
    Copy(other: b2Mat33): this;
    SetIdentity(): this;
    SetZero(): this;
    SelfAddM(M: b2Mat33): this;
    Solve33<T extends XYZ>(b_x: number, b_y: number, b_z: number, out: T): T;
    Solve22<T extends XY>(b_x: number, b_y: number, out: T): T;
    GetInverse22(M: b2Mat33): void;
    GetSymInverse33(M: b2Mat33): void;
    static MulM33V3<T extends XYZ>(A: b2Mat33, v: XYZ, out: T): T;
    static MulM33XYZ<T extends XYZ>(A: b2Mat33, x: number, y: number, z: number, out: T): T;
    static MulM33V2<T extends XY>(A: b2Mat33, v: XY, out: T): T;
    static MulM33XY<T extends XY>(A: b2Mat33, x: number, y: number, out: T): T;
}
export declare class b2Rot {
    static readonly IDENTITY: Readonly<b2Rot>;
    s: number;
    c: number;
    constructor(angle?: number);
    Clone(): b2Rot;
    Copy(other: b2Rot): this;
    SetAngle(angle: number): this;
    SetIdentity(): this;
    GetAngle(): number;
    GetXAxis<T extends XY>(out: T): T;
    GetYAxis<T extends XY>(out: T): T;
    static MulRR(q: b2Rot, r: b2Rot, out: b2Rot): b2Rot;
    static MulTRR(q: b2Rot, r: b2Rot, out: b2Rot): b2Rot;
    static MulRV<T extends XY>(q: b2Rot, v: XY, out: T): T;
    static MulTRV<T extends XY>(q: b2Rot, v: XY, out: T): T;
}
export declare class b2Transform {
    static readonly IDENTITY: Readonly<b2Transform>;
    readonly p: b2Vec2;
    readonly q: b2Rot;
    Clone(): b2Transform;
    Copy(other: b2Transform): this;
    SetIdentity(): this;
    SetPositionRotation(position: XY, q: Readonly<b2Rot>): this;
    SetPositionAngle(pos: XY, a: number): this;
    SetPosition(position: XY): this;
    SetPositionXY(x: number, y: number): this;
    SetRotation(rotation: Readonly<b2Rot>): this;
    SetRotationAngle(radians: number): this;
    GetPosition(): Readonly<b2Vec2>;
    GetRotation(): Readonly<b2Rot>;
    GetRotationAngle(): number;
    GetAngle(): number;
    static MulXV<T extends XY>(T: b2Transform, v: XY, out: T): T;
    static MulTXV<T extends XY>(T: b2Transform, v: XY, out: T): T;
    static MulXX(A: b2Transform, B: b2Transform, out: b2Transform): b2Transform;
    static MulTXX(A: b2Transform, B: b2Transform, out: b2Transform): b2Transform;
}
export declare class b2Sweep {
    readonly localCenter: b2Vec2;
    readonly c0: b2Vec2;
    readonly c: b2Vec2;
    a0: number;
    a: number;
    alpha0: number;
    Clone(): b2Sweep;
    Copy(other: b2Sweep): this;
    GetTransform(xf: b2Transform, beta: number): b2Transform;
    Advance(alpha: number): void;
    Normalize(): void;
}
