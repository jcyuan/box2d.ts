/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/
System.register(["@box2d", "../testbed.js"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, PolyShapesCallback, PolyShapes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (testbed_1) {
                testbed = testbed_1;
            }
        ],
        execute: function () {
            /**
             * This callback is called by b2.World::QueryAABB. We find
             * all the fixtures that overlap an AABB. Of those, we use
             * b2TestOverlap to determine which fixtures overlap a circle.
             * Up to 4 overlapped fixtures will be highlighted with a yellow
             * border.
             */
            PolyShapesCallback = class PolyShapesCallback extends b2.QueryCallback {
                constructor() {
                    super(...arguments);
                    this.m_circle = new b2.CircleShape();
                    this.m_transform = new b2.Transform();
                    this.m_count = 0;
                }
                ReportFixture(fixture) {
                    if (this.m_count === PolyShapesCallback.e_maxCount) {
                        return false;
                    }
                    const body = fixture.GetBody();
                    const shape = fixture.GetShape();
                    const overlap = b2.TestOverlapShape(shape, 0, this.m_circle, 0, body.GetTransform(), this.m_transform);
                    if (overlap) {
                        const color = new b2.Color(0.95, 0.95, 0.6);
                        const center = body.GetWorldCenter();
                        testbed.g_debugDraw.DrawPoint(center, 5.0, color);
                        ++this.m_count;
                    }
                    return true;
                }
            };
            exports_1("PolyShapesCallback", PolyShapesCallback);
            PolyShapesCallback.e_maxCount = 4;
            PolyShapes = class PolyShapes extends testbed.Test {
                constructor() {
                    super();
                    this.m_bodyIndex = 0;
                    this.m_bodies = b2.MakeArray(PolyShapes.e_maxBodies, () => null);
                    this.m_polygons = b2.MakeArray(4, () => new b2.PolygonShape());
                    this.m_circle = new b2.CircleShape();
                    // Ground body
                    {
                        const bd = new b2.BodyDef();
                        const ground = this.m_world.CreateBody(bd);
                        const shape = new b2.EdgeShape();
                        shape.SetTwoSided(new b2.Vec2(-40.0, 0.0), new b2.Vec2(40.0, 0.0));
                        ground.CreateFixture(shape, 0.0);
                    }
                    {
                        const vertices = new Array(3);
                        vertices[0] = new b2.Vec2(-0.5, 0.0);
                        vertices[1] = new b2.Vec2(0.5, 0.0);
                        vertices[2] = new b2.Vec2(0.0, 1.5);
                        this.m_polygons[0].Set(vertices, 3);
                    }
                    {
                        const vertices = new Array(3);
                        vertices[0] = new b2.Vec2(-0.1, 0.0);
                        vertices[1] = new b2.Vec2(0.1, 0.0);
                        vertices[2] = new b2.Vec2(0.0, 1.5);
                        this.m_polygons[1].Set(vertices, 3);
                    }
                    {
                        const w = 1.0;
                        const b = w / (2.0 + b2.Sqrt(2.0));
                        const s = b2.Sqrt(2.0) * b;
                        const vertices = new Array(8);
                        vertices[0] = new b2.Vec2(0.5 * s, 0.0);
                        vertices[1] = new b2.Vec2(0.5 * w, b);
                        vertices[2] = new b2.Vec2(0.5 * w, b + s);
                        vertices[3] = new b2.Vec2(0.5 * s, w);
                        vertices[4] = new b2.Vec2(-0.5 * s, w);
                        vertices[5] = new b2.Vec2(-0.5 * w, b + s);
                        vertices[6] = new b2.Vec2(-0.5 * w, b);
                        vertices[7] = new b2.Vec2(-0.5 * s, 0.0);
                        this.m_polygons[2].Set(vertices, 8);
                    }
                    {
                        this.m_polygons[3].SetAsBox(0.5, 0.5);
                    }
                    {
                        this.m_circle.m_radius = 0.5;
                    }
                    for (let i = 0; i < PolyShapes.e_maxBodies; ++i) {
                        this.m_bodies[i] = null;
                    }
                }
                CreateBody(index) {
                    if (this.m_bodies[this.m_bodyIndex] !== null) {
                        this.m_world.DestroyBody(this.m_bodies[this.m_bodyIndex]);
                        this.m_bodies[this.m_bodyIndex] = null;
                    }
                    const bd = new b2.BodyDef();
                    bd.type = b2.BodyType.b2_dynamicBody;
                    const x = b2.RandomRange(-2.0, 2.0);
                    bd.position.Set(x, 10.0);
                    bd.angle = b2.RandomRange(-b2.pi, b2.pi);
                    if (index === 4) {
                        bd.angularDamping = 0.02;
                    }
                    this.m_bodies[this.m_bodyIndex] = this.m_world.CreateBody(bd);
                    if (index < 4) {
                        const fd = new b2.FixtureDef();
                        fd.shape = this.m_polygons[index];
                        fd.density = 1.0;
                        fd.friction = 0.3;
                        this.m_bodies[this.m_bodyIndex].CreateFixture(fd);
                    }
                    else {
                        const fd = new b2.FixtureDef();
                        fd.shape = this.m_circle;
                        fd.density = 1.0;
                        fd.friction = 0.3;
                        this.m_bodies[this.m_bodyIndex].CreateFixture(fd);
                    }
                    this.m_bodyIndex = (this.m_bodyIndex + 1) % PolyShapes.e_maxBodies;
                }
                DestroyBody() {
                    for (let i = 0; i < PolyShapes.e_maxBodies; ++i) {
                        if (this.m_bodies[i] !== null) {
                            this.m_world.DestroyBody(this.m_bodies[i]);
                            this.m_bodies[i] = null;
                            return;
                        }
                    }
                }
                Keyboard(key) {
                    switch (key) {
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                        case "5":
                            this.CreateBody(key.charCodeAt(0) - "1".charCodeAt(0));
                            break;
                        case "a":
                            for (let i = 0; i < PolyShapes.e_maxBodies; i += 2) {
                                if (this.m_bodies[i] !== null) {
                                    const enabled = this.m_bodies[i].IsEnabled();
                                    this.m_bodies[i].SetEnabled(!enabled);
                                }
                            }
                            break;
                        case "d":
                            this.DestroyBody();
                            break;
                    }
                }
                Step(settings) {
                    super.Step(settings);
                    const callback = new PolyShapesCallback();
                    callback.m_circle.m_radius = 2.0;
                    callback.m_circle.m_p.Set(0.0, 1.1);
                    callback.m_transform.SetIdentity();
                    const aabb = new b2.AABB();
                    callback.m_circle.ComputeAABB(aabb, callback.m_transform, 0);
                    this.m_world.QueryAABB(callback, aabb);
                    const color = new b2.Color(0.4, 0.7, 0.8);
                    testbed.g_debugDraw.DrawCircle(callback.m_circle.m_p, callback.m_circle.m_radius, color);
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, `Press 1-5 to drop stuff, maximum of ${PolyShapesCallback.e_maxCount} overlaps detected`);
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "Press 'a' to enable/disable some bodies");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "Press 'd' to destroy a body");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                }
                static Create() {
                    return new PolyShapes();
                }
            };
            exports_1("PolyShapes", PolyShapes);
            PolyShapes.e_maxBodies = 256;
        }
    };
});
//# sourceMappingURL=poly_shapes.js.map